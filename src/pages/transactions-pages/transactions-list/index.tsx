import React from 'react';
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useAPI } from 'src/app/providers';
import { Stack } from '@mui/system';
import { TransactionsActions } from 'src/features/transactions-actions';
import { useSetActiveTransaction } from 'src/entities/transactions';
import { columns, useRows } from './hooks';

export function BaseTransactionsList() {
  const { transactions: transactionsApi } = useAPI();
  const rows = useRows();

  useSetActiveTransaction();

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
            alignItems: 'center',
            justifyContent: 'center',
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
