import { useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { TRANSACTIONS_WIZARD_INFO } from 'src/app/routes';
import { useAPI, useStore } from 'src/app/providers';

export const useRows = () => {
  const { transactions: transactionsApi } = useAPI();
  const { transactions, users, organizations } = useStore();
  const navigate = useNavigate();

  return useMemo(
    () =>
      transactions?.values.map(transaction => {
        const {
          id,
          comment,
          status,
          transferAmount,
          checkCode,
          requestNumber,
          issuer,
          employee,
        } = transaction;

        const [, issuerId] = issuer?.split('/') || [null, null];
        const [, employeeId] = employee?.split('/') || [null, null];
        const issuerData =
          users?.find(issuerId ?? '') || organizations?.find(issuerId ?? '');
        const employeeData = users?.find(employeeId ?? '');

        return {
          id,
          comment,
          status,
          transferAmount,
          checkCode,
          requestNumber,
          inn: issuerData?.inn,
          issuerName: issuerData?.name,
          employeeName: employeeData?.initials,
          actions: {
            onOpen() {
              navigate(
                generatePath(TRANSACTIONS_WIZARD_INFO, {
                  transactionId: id,
                }),
              );
              transactions?.setActive(id);
            },
            onStatusChange: transactions?.canEdit(transaction)
              ? (newStatus: number) => {
                  transactionsApi?.createOrUpdate(
                    {
                      status: newStatus,
                    },
                    id,
                  );
                }
              : null,
          },
        };
      }) ?? [],
    [
      transactions?.size,
      organizations?.size,
      users?.size,
      transactionsApi?.isUpdating,
    ],
  );
};
