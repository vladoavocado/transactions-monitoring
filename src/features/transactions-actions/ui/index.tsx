import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Stack, StackProps } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { useAPI, useStore } from 'src/app/providers';
import { logger } from 'src/shared/utils';

export function BaseTransactionsActions(props: StackProps) {
  const { transactions: transactionsApi } = useAPI();
  const { transactions, users, account } = useStore();
  const ids = useMemo<string[]>(
    () => transactions?.values.map(({ id }) => id) || [],
    [transactions?.size],
  );

  const onReset = async () => {
    transactionsApi?.createOrUpdate(
      {
        employee: null,
      },
      ids,
    );
  };

  const onDelegate = async () => {
    const employees = users?.employees;

    // Make sure there are employees to assign
    if (!employees || employees.length === 0) {
      logger.error('No employees available for assignment');
      return;
    }

    // Iterate over each transaction and assign it to a random employee
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
  };

  if (!account?.isAdmin) {
    return null;
  }

  return (
    <Stack {...props}>
      <LoadingButton
        color='primary'
        onClick={onDelegate}
        loading={transactionsApi?.isUpdating}
      >
        Распределить транзакции
      </LoadingButton>
      <LoadingButton
        variant='outlined'
        color='error'
        onClick={onReset}
        loading={transactionsApi?.isUpdating}
      >
        Сбросить транзакции
      </LoadingButton>
    </Stack>
  );
}

export const TransactionsActions = observer(BaseTransactionsActions);
