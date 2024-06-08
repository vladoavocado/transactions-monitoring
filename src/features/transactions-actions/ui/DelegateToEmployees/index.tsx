import React, { useCallback, useMemo } from 'react';
import { logger } from 'src/shared/utils';
import { useAPI, useStore } from 'src/app/providers';
import { LoadingButton } from '@mui/lab';
import { observer } from 'mobx-react-lite';

export function BaseDelegateToEmployees() {
  const { transactions: transactionsApi } = useAPI();
  const { transactions, users, account } = useStore();

  const onClick = useCallback(async () => {
    const employees = users?.employees;

    if (!employees || employees.length === 0) {
      logger.error('No employees available for assignment');
      return;
    }

    await Promise.all(
      transactions?.values.map(async transaction => {
        const randomIndex = Math.floor(Math.random() * employees.length); // Get a random index
        const assignedEmployee = employees[randomIndex]; // Access a random employee

        await transactionsApi?.createOrUpdate(
          {
            employee: `users/${assignedEmployee.id}`, // Assign the random employee's ID
          },
          transaction.id,
        );

        return Promise.resolve();
      }) || [],
    );
  }, []);

  return (
    <LoadingButton
      color='primary'
      onClick={onClick}
      loading={transactionsApi?.isUpdating}
    >
      Распределить транзакции
    </LoadingButton>
  );
}

export const DelegateToEmployees = observer(BaseDelegateToEmployees);
