import React from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  TransactionsAccountAnalysisForm,
  useSetActiveTransaction,
} from 'src/entities/transactions';
import { useAPI, useStore } from 'src/app/providers';
import { observer } from 'mobx-react-lite';
import { Skeleton } from '@mui/lab';

interface IProps {}

export function BaseAnalysisCurrentAccountPage(props: IProps) {
  const { transactions } = useStore();
  const { transactions: transactionsApi } = useAPI();

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
        {transactionsApi?.isFetching ? (
          <Skeleton height='5.5em' width='55em' />
        ) : (
          <Typography fontWeight='bold' variant='h4'>
            Транзакция № {transactions?.active?.requestNumber} - Анализ текущего
            счёта клиента
          </Typography>
        )}
      </Stack>

      <TransactionsAccountAnalysisForm />
    </Stack>
  );
}

export const AnalysisCurrentAccountPage = observer(
  BaseAnalysisCurrentAccountPage,
);
