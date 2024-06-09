import { GlobalUi } from 'src/shared/model/global-ui';
import { Nullable, Models } from 'src/shared';
import { logger } from 'src/shared/utils';

import IAccountModel = Models.IAccountModel;
import IAuthModel = Models.IAuthModel;
import IRootModel = Models.IRootModel;
import IUsersModel = Models.IUsersModel;
import ITransactionsModel = Models.ITransactionsModel;
import IOrganizationsModel = Models.IOrganizationsModel;
import IMessagesModel = Models.IMessagesModel;
import IChatsModel = Models.IChatsModel;

export class RootModel implements IRootModel {
  ui = new GlobalUi(this);

  account: Nullable<IAccountModel> = null;

  auth: Nullable<IAuthModel> = null;

  users: Nullable<IUsersModel> = null;

  transactions: Nullable<ITransactionsModel> = null;

  organizations: Nullable<IOrganizationsModel> = null;

  messages: Nullable<IMessagesModel> = null;

  chats: Nullable<IChatsModel> = null;

  constructor(models: Record<keyof IRootModel, new (...args: any[]) => any>) {
    if (!models) {
      throw new TypeError(
        'Cannot create RootStore due to invalid models argument shape.',
      );
    }

    Object.entries(models).forEach(([key, Model]) => {
      try {
        (this as any)[key] = new Model(this);
      } catch (err) {
        logger.error(
          `The Model: ${Model} cannot be called within new keyword.`,
        );
      }
    });

    Object.freeze(this);
  }
}
