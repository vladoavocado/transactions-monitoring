import { ConvertSnakeToCamelCase, IEntityModel, Nullable } from 'src/shared';
import { RemoteShapes } from 'src/shared/types/shapes';

export namespace Models {
  import ITransactionShape = RemoteShapes.ITransactionShape;
  import IUserShape = RemoteShapes.IUserShape;

  export interface IAccountServer {
    id: string;
  }

  export interface IAccount {
    displayName: Nullable<string>;
    role: Nullable<string>;
    id: Nullable<string>;
  }

  export interface IUser extends ConvertSnakeToCamelCase<IUserShape> {
    id: string;
  }

  export interface ITransaction
    extends ConvertSnakeToCamelCase<ITransactionShape> {
    id: string;
  }

  export interface IAccountModel extends IAccount {
    parse(data: IAccountServer): void;
    reset(): void;
  }

  export interface IAuthModel {
    setToken(token: Nullable<string>): void;
    resetToken(): void;
    hasToken: boolean;
  }

  export interface ITransactionsModel extends IEntityModel<ITransaction> {}

  export interface IUsersModel extends IEntityModel<IUser> {}

  export interface IRootModel {
    auth: Nullable<IAuthModel>;
    account: Nullable<IAccountModel>;
    transactions: Nullable<ITransactionsModel>;
    users: Nullable<IUsersModel>;
  }
}
