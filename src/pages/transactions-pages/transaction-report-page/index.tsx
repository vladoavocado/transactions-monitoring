import React, { useState } from 'react';
import { Stack } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useSetActiveTransaction } from 'src/entities/transactions';
import { TransactionInfoPage } from 'src/pages/transactions-pages/transaction-info-page';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { HOME_PATH } from 'src/app/routes';
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
        <Button
          size='large'
          variant='outlined'
          color='primary'
          onClick={() => makeEditable(true)}
        >
          Редактировать
        </Button>
        <Button
          component={Link}
          to={HOME_PATH}
          size='large'
          variant='outlined'
          color='error'
        >
          Закрыть
        </Button>
      </Stack>
    </Stack>
  );
}

export const TransactionReportPage = observer(BaseTransactionReportPage);
