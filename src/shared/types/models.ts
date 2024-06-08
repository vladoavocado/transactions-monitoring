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
    fullName: string;
    type: string;
    readableRole: Nullable<any>;
  }

  export type ITransactionChecks = ConvertSnakeToCamelCase<
    ITransactionShape['checks']
  >;

  export type ITransactionFiles = ConvertSnakeToCamelCase<
    ITransactionShape['files']
  >;

  export type ITransactionRisks = ConvertSnakeToCamelCase<
    ITransactionShape['risks']
  >;

  export interface ITransaction
    extends ConvertSnakeToCamelCase<
        Omit<ITransactionShape, 'checks' | 'files'>
      >,
      IDomainMethods<ITransaction> {
    id: string;
    checks: ITransactionChecks;
    risks: ITransactionRisks;
    files: ITransactionFiles;
  }

  export interface IOrganization
    extends ConvertSnakeToCamelCase<IOrganizationShape>,
      IDomainMethods<IOrganization> {
    id: string;
    name: string;
    type: string;
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
    visible: ITransaction[];
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
