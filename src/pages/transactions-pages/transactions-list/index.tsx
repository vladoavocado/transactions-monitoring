import React, { useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useAPI, useStore } from 'src/app/providers';
import { Stack } from '@mui/system';
import { DoDisturb, OpenInNew, PriceCheck } from '@mui/icons-material';
import { generatePath, useNavigate } from 'react-router-dom';
import { TRANSACTIONS_WIZARD_INFO } from 'src/app/routes';
import { TransactionsActions } from 'src/features/transactions-actions/ui';

const columns: GridColDef<any>[] = [
  {
    field: 'requestNumber',
    headerName: '№ запроса',
    type: 'string',
    align: 'center',
    width: 125,
    sortable: true,
  },
  {
    field: 'issuerName',
    headerName: 'Организация / ФИО',
    type: 'string',
    width: 250,
    sortable: true,
  },
  {
    field: 'inn',
    headerName: 'ИНН',
    type: 'string',
    width: 125,
    sortable: true,
  },
  {
    field: 'checkCode',
    headerName: '№ проверки',
    type: 'string',
    width: 125,
    sortable: true,
  },
  {
    field: 'transferAmount',
    headerName: 'Сумма перевода (руб.)',
    type: 'number',
    width: 200,
    sortable: true,
  },
  {
    field: 'employeeName',
    headerName: 'Сотрудник',
    type: 'string',
    width: 150,
    sortable: true,
  },
  {
    field: 'status',
    headerName: 'Статус',
    type: 'string',
    width: 150,
    sortable: true,
    renderCell: params => {
      const isPassed = params.value > 0;

      return (
        <Chip
          size='small'
          variant='filled'
          color={isPassed ? 'success' : 'error'}
          label={isPassed ? 'Проведено' : 'Отказ'}
        />
      );
    },
  },
  {
    field: 'comment',
    headerName: 'Комментарий',
    type: 'string',
    width: 350,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: true,
    renderCell: params => {
      const { actions } = params.row;
      const { onStatusChange, onOpen } = actions;

      return (
        <Stack flexDirection='row' sx={{ position: 'sticky', right: 0 }}>
          {onStatusChange && (
            <IconButton
              sx={{ height: '1.5em', width: '1.5em' }}
              size='small'
              color='success'
              onClick={() => {
                onStatusChange(true);
              }}
            >
              <PriceCheck />
            </IconButton>
          )}
          {onStatusChange && (
            <IconButton
              sx={{ height: '1.5em', width: '1.5em' }}
              size='small'
              color='error'
              onClick={() => {
                onStatusChange(false);
              }}
            >
              <DoDisturb />
            </IconButton>
          )}
          <IconButton
            size='small'
            sx={{ height: '1.5em', width: '1.5em', ml: 'auto' }}
            color='primary'
            onClick={onOpen}
          >
            <OpenInNew />
          </IconButton>
        </Stack>
      );
    },
  },
];

export function BaseTransactionsList() {
  const { transactions: transactionsApi } = useAPI();
  const { transactions, users, organizations } = useStore();
  const navigate = useNavigate();
  const rows = useMemo(
    () =>
      transactions?.values.map(transaction => {
        const {
          id,
          comment,
          status,
          transferAmount,
          checkCode,
          requestNumber,
          issuer,
          employee,
        } = transaction;

        const [, issuerId] = issuer?.split('/') || [null, null];
        const [, employeeId] = employee?.split('/') || [null, null];
        const issuerData =
          users?.find(issuerId ?? '') || organizations?.find(issuerId ?? '');
        const employeeData = users?.find(employeeId ?? '');

        return {
          id,
          comment,
          status,
          transferAmount,
          checkCode,
          requestNumber,
          inn: issuerData?.inn,
          issuerName: issuerData?.name,
          employeeName: employeeData?.initials,
          actions: {
            onOpen() {
              navigate(
                generatePath(TRANSACTIONS_WIZARD_INFO, {
                  transactionId: id,
                }),
              );
              transactions?.setActive(id);
            },
            onStatusChange: transactions?.canEdit(transaction)
              ? (newStatus: number) => {
                  transactionsApi?.createOrUpdate(
                    {
                      status: newStatus,
                    },
                    id,
                  );
                }
              : null,
          },
        };
      }) ?? [],
    [
      transactions?.size,
      organizations?.size,
      users?.size,
      transactionsApi?.isUpdating,
    ],
  );

  useEffect(() => {
    transactions?.setActive(null);
  }, [transactions]);

  return (
    <Stack
      sx={{
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateRows: 'min-content 1fr',
        gap: 2.5,
      }}
    >
      <Stack gap={1}>
        <Typography fontWeight='bold' variant='h4'>
          Журнал транзакций клиентов
        </Typography>
        <Typography variant='body1'>
          Данная таблица содержит список всех транзакций, совершённых клиентами.
        </Typography>
      </Stack>
      <Card sx={{ p: 2, borderRadius: 2 }}>
        {!transactionsApi?.isFetching && (
          <TransactionsActions
            alignItems='flex-start'
            justifyContent='flex-end'
            flexDirection='row'
            gap={2}
            sx={{ px: 2 }}
          />
        )}
        <CardContent
          sx={{
            minHeight: '5em',
            display: 'flex',
          }}
        >
          {transactionsApi?.isFetching ? (
            <CircularProgress size={48} color='primary' thickness={3} />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              rowHeight={30}
              disableColumnSorting={false}
              hideFooterPagination
              disableRowSelectionOnClick
              disableColumnResize
              sortModel={[
                {
                  field: 'requestNumber', // The field to sort by
                  sort: 'asc', // Sort direction: 'asc' for ascending, 'desc' for descending
                },
              ]}
            />
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}

export const TransactionsList = observer(BaseTransactionsList);
