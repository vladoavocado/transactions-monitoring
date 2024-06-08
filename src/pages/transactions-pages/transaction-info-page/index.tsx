import React from 'react';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { TransactionsActions } from 'src/features/transactions-actions/ui';
import { useAPI, useStore } from 'src/app/providers';
import { observer } from 'mobx-react-lite';
import { IssuerProfile } from 'src/widgets/issuer-profile';
import { useSetActiveTransaction } from 'src/entities/transactions';

interface IProps {}

export function BaseTransactionInfoPage(props: IProps) {
  const { transactions: transactionsApi, users: usersApi } = useAPI();

  useSetActiveTransaction();

  return (
    <Stack
      sx={{
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateRows: 'repeat(2, min-content)',
        gap: 2.5,
      }}
    >
      <Stack gap={1}>
        <Typography fontWeight='bold' variant='h4'>
          Информация о транзакции
        </Typography>
      </Stack>

      <IssuerProfile />

      <Card sx={{ p: 2, borderRadius: 2 }}>
        <CardContent
          sx={{
            minHeight: '5em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {
            transactionsApi?.isFetching ? (
              <CircularProgress size={48} color='primary' thickness={3} />
            ) : null
            // <DataGrid
            //   rows={rows}
            //   columns={columns}
            //   rowHeight={30}
            //   disableColumnSorting={false}
            //   hideFooterPagination
            //   disableRowSelectionOnClick
            //   disableColumnResize
            //   sortModel={[
            //     {
            //       field: 'requestNumber', // The field to sort by
            //       sort: 'asc', // Sort direction: 'asc' for ascending, 'desc' for descending
            //     },
            //   ]}
            // />
          }
        </CardContent>
      </Card>
    </Stack>
  );
}

export const TransactionInfoPage = observer(BaseTransactionInfoPage);
