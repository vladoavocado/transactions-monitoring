import { logger } from 'src/shared/utils';

import { Models, Nullable, ReactiveApi } from 'src/shared/types';

import IRootApi = ReactiveApi.IRootApi;
import IAuthApi = ReactiveApi.IAuthApi;
import IRootModel = Models.IRootModel;
import ITransactionsApi = ReactiveApi.ITransactionsApi;
import IUsersApi = ReactiveApi.IUsersApi;
import IOrganizationsApi = ReactiveApi.IOrganizationsApi;
import IChatsApi = ReactiveApi.IChatsApi;
import IMessagesApi = ReactiveApi.IMessagesApi;

/* eslint-disable no-underscore-dangle */
export class RootApi implements IRootApi {
  auth: Nullable<IAuthApi> = null;

  transactions: Nullable<ITransactionsApi> = null;

  users: Nullable<IUsersApi> = null;

  organizations: Nullable<IOrganizationsApi> = null;

  chats: Nullable<IChatsApi> = null;

  messages: Nullable<IMessagesApi> = null;

  constructor(
    store: IRootModel,
    apis: Record<keyof IRootApi, new (...args: any[]) => any>,
  ) {
    if (!apis) {
      throw new TypeError(
        'Cannot create RootApi due to invalid apis argument shape.',
      );
    }

    Object.entries(apis).forEach(([key, Api]) => {
      try {
        (this as any)[key] = new Api(store, this);
      } catch (err) {
        logger.error(`The Api: ${Api} cannot be called within new keyword.`);
      }
    });

    Object.freeze(this);
  }
  /* eslint-enable no-underscore-dangle */
}
