import React from 'react';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  TransactionsAccountAnalysis,
  useSetActiveTransaction,
} from 'src/entities/transactions';
import { useAPI, useStore } from 'src/app/providers';
import { observer } from 'mobx-react-lite';
import { Skeleton } from '@mui/lab';

interface IProps {
  readonly?: boolean;
  title?: string;
}

export function BaseAnalysisCurrentAccountPage({ readonly, title }: IProps) {
  const { transactions } = useStore();
  const { transactions: transactionsApi } = useAPI();

  useSetActiveTransaction();

  return (
    <Stack
      sx={{
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateRows: 'repeat(2, min-content)',
        gridTemplateColumns: '1fr',
        maxWidth: '70em',
        justifyContent: 'stretch',
        gap: 2.5,
      }}
    >
      <Stack gap={1}>
        {transactionsApi?.isFetching ? (
          <Skeleton height='5.5em' width='70em' />
        ) : (
          <Typography fontWeight='bold' variant='h4'>
            {title ||
              `Транзакция № ${transactions?.active?.requestNumber} - Анализ текущего
            счёта клиента`}
          </Typography>
        )}
      </Stack>

      <TransactionsAccountAnalysis readonly={readonly} />
    </Stack>
  );
}

export const AnalysisCurrentAccountPage = observer(
  BaseAnalysisCurrentAccountPage,
);
