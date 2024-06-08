import { useMemo } from 'react';
import { useAPI, useStore } from 'src/app/providers';
import { Models } from 'src/shared';
import { useIssuerData } from './use-issuer-data';
import IUser = Models.IUser;

export const useByIssuerRows = () => {
  const getIssuer = useIssuerData();
  const { transactions: transactionsApi } = useAPI();
  const { transactions, users, organizations } = useStore();
  const { active } = transactions || {};

  return useMemo(() => {
    if (!active) {
      return [];
    }

    const { data, type } = getIssuer(active?.issuer ?? '');

    return [
      {
        id: active?.id,
        requestNumber: active?.requestNumber,
        issuerName:
          type === 'organizations' ? data?.name : `${(data as IUser).fullName}`,
        checkCode: active?.checkCode,
        transferAmount: active?.transferAmount,
        receiverName: active?.receiver,
      },
    ];
  }, [
    transactions?.size,
    organizations?.size,
    users?.size,
    transactionsApi?.isUpdating,
    active,
  ]);
};
