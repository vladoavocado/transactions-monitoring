import {
  ConvertSnakeToCamelCase,
  IEntityModel,
  Nullable,
  ReactiveApi,
} from 'src/shared';
import { RemoteShapes } from 'src/shared/types/shapes';

export namespace Models {
  import ITransactionShape = RemoteShapes.ITransactionShape;
  import IUserShape = RemoteShapes.IUserShape;
  import IOrganizationShape = RemoteShapes.IOrganizationShape;
  import IUsersApi = ReactiveApi.IUsersApi;

  export interface IAccountServer {
    id: string;
  }

  export interface IAccount {
    displayName: Nullable<string>;
    role: Nullable<string>;
    id: Nullable<string>;
  }

  export interface IDomainMethods<T> {
    merge?: (data: T) => void;
  }

  export interface IUser
    extends ConvertSnakeToCamelCase<IUserShape>,
      IDomainMethods<IUser> {
    id: string;
    name: string;
  }

  export interface ITransaction
    extends ConvertSnakeToCamelCase<ITransactionShape>,
      IDomainMethods<ITransaction> {
    id: string;
  }

  export interface IOrganization
    extends ConvertSnakeToCamelCase<IOrganizationShape>,
      IDomainMethods<IOrganization> {
    id: string;
    name: string;
  }

  export interface IAccountModel extends IAccount {
    parse(data: IAccountServer): void;
    reset(): void;

    isAdmin: boolean;
  }

  export interface IAuthModel {
    setToken(token: Nullable<string>): void;
    resetToken(): void;
    hasToken: boolean;
  }

  export interface ITransactionsModel extends IEntityModel<ITransaction> {
    active: Nullable<ITransaction>;
    setActive(id: Nullable<string>): void;
    canEdit(id: ITransaction): boolean;
  }

  export interface IUsersModel extends IEntityModel<IUser> {
    employees: IUser[];
  }

  export interface IOrganizationsModel extends IEntityModel<IOrganization> {}

  export interface IRootModel {
    auth: Nullable<IAuthModel>;
    account: Nullable<IAccountModel>;
    organizations: Nullable<IOrganizationsModel>;
    transactions: Nullable<ITransactionsModel>;
    users: Nullable<IUsersModel>;
  }
}
