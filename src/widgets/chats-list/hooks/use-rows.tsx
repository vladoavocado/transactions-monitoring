import React, { useMemo } from 'react';
import { useAPI, useStore } from 'src/app/providers';
import { ChatConversationRoom } from 'src/entities/chat/ui';
import { useGetTransactionIssuer } from 'src/entities/transactions';
import { useModal } from 'src/app/providers/with-modal';
import { Models } from 'src/shared';

import IUser = Models.IUser;
import IOrganization = Models.IOrganization;

export const useRows = () => {
  const getIssuer = useGetTransactionIssuer();
  const { messages: messagesApi, chats: chatsApi } = useAPI();
  const { users, chats } = useStore();

  const { onShow } = useModal({
    maxWidth: 'md',
    fullWidth: true,
  });

  const showModal = onShow({
    title: 'Чат',
    children: <ChatConversationRoom />,
    // eslint-disable-next-line react/jsx-no-useless-fragment
    actions: <></>,
  });

  return useMemo(
    () =>
      chats?.visible.map(
        ({ id, title, customer, employee, createdAt }, index) => {
          const { data: customerData, type } = getIssuer(customer);
          const { data: employeeData } = getIssuer(employee);

          return {
            id,
            title,
            chatNumber: index + 1,
            createdAt: createdAt.seconds * 1000,
            customer:
              type === 'organizations'
                ? (customerData as IOrganization).name
                : (customerData as IUser).initials,
            employee: (employeeData as IUser).initials,
            actions: {
              onOpen() {
                chats?.setActive(id);
                showModal();
              },
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
