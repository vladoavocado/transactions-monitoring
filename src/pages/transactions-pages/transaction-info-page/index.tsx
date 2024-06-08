import React from 'react';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useAPI, useStore } from 'src/app/providers';
import { observer } from 'mobx-react-lite';
import { IssuerProfile } from 'src/widgets/issuer-profile';
import {
  TransactionsListByIssuer,
  useSetActiveTransaction,
} from 'src/entities/transactions';

interface IProps {}

export function BaseTransactionInfoPage(props: IProps) {
  const { transactions: transactionsApi } = useAPI();
  const { transactions } = useStore();

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
          Информация о транзакции № {transactions?.active?.requestNumber}
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
          {transactionsApi?.isFetching ? (
            <CircularProgress size={48} color='primary' thickness={3} />
          ) : (
            <TransactionsListByIssuer />
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}

export const TransactionInfoPage = observer(BaseTransactionInfoPage);
