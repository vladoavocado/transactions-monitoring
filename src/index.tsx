/* eslint-disable import/no-import-module-exports */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'src/app';
import { Router } from 'src/pages';

// ** Reactive Storage and Api
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { RootModel } from 'src/app/models';
import { RootApi } from 'src/app/api';
import { GlobalStyles } from 'src/global-styles';
import { AccountModel } from 'src/entities/account/model';
import { AuthModel } from 'src/entities/auth/model';
import { AuthApi } from 'src/entities/auth/api';
import { BACKEND_CONFIG } from 'src/configs/env';
import { logger } from 'src/shared/utils';
import { TransactionsList } from 'src/entities/transactions/model';
import { UsersList } from 'src/entities/users/model';
import { TransactionsApi } from 'src/entities/transactions/api';
import { UsersApi } from 'src/entities/users/api';
import { OrganizationsApi } from 'src/entities/organizations/api';
import { OrganizationsList } from 'src/entities/organizations/model';
import { MessagesList } from 'src/entities/messages/model';
import { ChatsList } from 'src/entities/chat/model/chats-list';
import { ChatsApi } from 'src/entities/chat/api';
import { MessagesApi } from 'src/entities/messages';

initializeApp(BACKEND_CONFIG);
getAuth();

const store = new RootModel({
  account: AccountModel,
  auth: AuthModel,
  transactions: TransactionsList,
  organizations: OrganizationsList,
  users: UsersList,
  messages: MessagesList,
  chats: ChatsList,
});

const api = new RootApi(store, {
  auth: AuthApi,
  transactions: TransactionsApi,
  organizations: OrganizationsApi,
  users: UsersApi,
  chats: ChatsApi,
  messages: MessagesApi,
});

const rootNode = document.querySelector('#root') as HTMLDivElement;

const render = () => {
  const root = createRoot(rootNode);

  root.render(
    <App store={store} api={api}>
      <Router />
      <GlobalStyles />
    </App>,
  );

  return root;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let root = render();

// Setup HMR
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept(() => {
    // You can add any code here that needs to run when a module is replaced.
    logger.log('Module hot replaced, updating app...');
    root = render();
  });
}
