import {useEffect} from "react";
import {useAPI, useStore} from "src/app/providers";
import {useParams} from "react-router-dom";

export const useSetActive = (customTransactionId?: string) => {
  const { transactionId: transactionIdFromParams } = useParams();
  const { transactions: transactionsApi, users: usersApi } = useAPI();
  const { transactions } = useStore();
  const transactionId = customTransactionId || transactionIdFromParams;

  useEffect(() => {
    if (!transactionsApi?.isFetching && !usersApi?.isFetching) {
      transactions?.setActive(transactionId ?? null);
    }
  }, [transactionId, transactionsApi?.isFetching, usersApi?.isFetching]);
};
