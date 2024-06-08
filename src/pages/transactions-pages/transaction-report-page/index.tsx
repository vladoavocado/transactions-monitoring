import React, { useState } from 'react';
import { Stack } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useSetActiveTransaction } from 'src/entities/transactions';
import { TransactionInfoPage } from 'src/pages/transactions-pages/transaction-info-page';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import { AnalysisRiskPage } from '../analysis-risk-page';
import { AnalysisCurrentAccountPage } from '../analysis-current-account-page';

export function BaseTransactionReportPage() {
  const [readonly, setReadonly] = useState(true);

  const makeEditable = (editable: boolean) => {
    setReadonly(!editable);
  };

  useSetActiveTransaction();

  return (
    <Stack flexDirection='column' gap={4}>
      <TransactionInfoPage />
      <AnalysisCurrentAccountPage
        readonly={readonly}
        title='Результат анализа транзакции'
      />
      <AnalysisRiskPage readonly={readonly} title='Результат риск-анализа' />

      <Stack
        justifySelf='flex-start'
        sx={{ pb: 4 }}
        flexDirection='row'
        gap={2}
      >
        <LoadingButton
          size='large'
          variant='contained'
          color='primary'
          onClick={() => makeEditable(false)}
        >
          Сохранить
        </LoadingButton>
        <Button
          size='large'
          variant='outlined'
          color='inherit'
          onClick={() => makeEditable(true)}
        >
          Редактировать
        </Button>
      </Stack>
    </Stack>
  );
}

export const TransactionReportPage = observer(BaseTransactionReportPage);
