import { useEffect } from 'react';
import { useAPI, useStore } from 'src/app/providers';
import { useParams } from 'react-router-dom';

export const useSetActive = (customTransactionId?: string) => {
  const { transactionId: transactionIdFromParams } = useParams();
  const { transactions: transactionsApi, users: usersApi } = useAPI();
  const { transactions } = useStore();
  const { active } = transactions || {};
  const transactionId = customTransactionId || transactionIdFromParams;
  const isSame = active?.id === transactionId;

  useEffect(() => {
    if (!transactionsApi?.isFetching && !usersApi?.isFetching && !isSame) {
      transactions?.setActive(transactionId ?? null);
    }
  }, [transactionId, transactionsApi?.isFetching, usersApi?.isFetching]);
};
