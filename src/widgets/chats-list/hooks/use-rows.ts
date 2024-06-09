import { useMemo } from 'react';
import { useAPI, useStore } from 'src/app/providers';
import { Models } from 'src/shared';
import { useGetTransactionIssuer } from 'src/entities/transactions';
import IUser = Models.IUser;
import dayjs from 'dayjs';

export const useRows = () => {
  const getIssuer = useGetTransactionIssuer();
  const { messages: messagesApi, chats: chatsApi } = useAPI();
  const { users, chats } = useStore();

  return useMemo(
    () =>
      chats?.visible.map(
        ({ id, title, customer, employee, createdAt }, index) => {
          const { data: customerData } = getIssuer(customer);
          const { data: employeeData } = getIssuer(employee);

          return {
            id,
            title,
            chatNumber: index + 1,
            createdAt: createdAt.seconds * 1000,
            customer: (customerData as IUser).initials,
            employee: (employeeData as IUser).initials,
            actions: {
              onOpen() {},
            },
          };
        },
      ),
    [
      users?.size,
      chats?.visible,
      messagesApi?.isUpdating,
      chatsApi?.isUpdating,
    ],
  );
};
