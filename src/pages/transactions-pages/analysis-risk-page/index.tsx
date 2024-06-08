import React from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  TransactionsRiskAnalysis,
  useSetActiveTransaction,
} from 'src/entities/transactions';
import { useAPI, useStore } from 'src/app/providers';
import { observer } from 'mobx-react-lite';
import { Skeleton } from '@mui/lab';

export function BaseAnalysisRiskPage() {
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
            Транзакция № {transactions?.active?.requestNumber} - Риск Анализ
          </Typography>
        )}
      </Stack>

      <TransactionsRiskAnalysis />
    </Stack>
  );
}

export const AnalysisRiskPage = observer(BaseAnalysisRiskPage);
