import React, { useMemo } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAPI, useStore } from 'src/app/providers';
import { observer } from 'mobx-react-lite';

export function BaseResetStatuses() {
  const { transactions: transactionsApi } = useAPI();
  const { transactions } = useStore();
  const ids = useMemo<string[]>(
    () => transactions?.values.map(({ id }) => id) || [],
    [transactions?.size],
  );

  const onReset = async () => {
    transactionsApi?.createOrUpdate(
      {
        status: null,
      },
      ids,
    );
  };

  return (
    <LoadingButton
      variant='outlined'
      color='error'
      onClick={onReset}
      loading={transactionsApi?.isUpdating}
    >
      Сбросить статусы
    </LoadingButton>
  );
}

export const ResetStatuses = observer(BaseResetStatuses);
