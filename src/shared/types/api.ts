import { WhereFilterOp } from 'firebase/firestore';
import { Models, Nullable } from 'src/shared';
import { RemoteShapes } from 'src/shared/types/shapes';

export namespace ReactiveApi {
  import ITransactionShape = RemoteShapes.ITransactionShape;
  import ITransaction = Models.ITransaction;
  import IUserShape = RemoteShapes.IUserShape;
  import IUser = Models.IUser;
  import IOrganizationShape = RemoteShapes.IOrganizationShape;
  import IOrganization = Models.IOrganization;

  type IApiOptions = Record<string, any>;

  export type IDatabaseSubscription = () => void;

  export type Payload = Record<string, any>;

  interface IWhereCondition {
    fieldPath: string;
    filter: WhereFilterOp;
    value: any;
  }

  interface IOrderByCondition {
    fieldPath: string;
    direction?: 'asc' | 'desc';
  }

  export interface IDatabaseQuery {
    whereConditions?: IWhereCondition[];
    orderByConditions?: IOrderByCondition[];
    limit?: number;
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  export interface IDatabase {
    get<T>(path: string, queryObj?: IDatabaseQuery): Promise<T>;
    set<D extends Record<string, any>, T>(
      path: string,
      data: D,
      id?: string,
    ): Promise<T>;
    setMultiple<D extends Record<string, any>, T>(
      path: string,
      data: D,
      ids?: string[],
    ): Promise<T[]>;
    delete<T>(path: string, id: string): Promise<T>;
    subscribe<T>(
      path: string,
      onUpdate: (data: T) => void,
      queryObj?: IDatabaseQuery,
    ): IDatabaseSubscription[];
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  export interface IBaseApi<TData extends Payload, TResult> {
    fetch(query?: IDatabaseQuery): Promise<TResult | TResult[]>;
    createOrUpdate(
      data: Partial<TData>,
      id?: string | string[],
      options?: IApiOptions,
    ): Promise<TResult | TResult[]>;
    delete(id: string): Promise<TResult>;
    listen(query?: IDatabaseQuery): void;
  }

  export interface IApiState {
    isFetching: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isPatching: boolean;
    isDeleting: boolean;
  }

  export interface IAuthApiState {
    isPending: boolean;
  }

  export interface ITransactionsApi
    extends IBaseApi<ITransactionShape, ITransaction>,
      IApiState {}

  export interface IUsersApi extends IBaseApi<IUserShape, IUser>, IApiState {}

  export interface IOrganizationsApi
    extends IBaseApi<IOrganizationShape, IOrganization>,
      IApiState {}

  export interface IAuthApi extends IAuthApiState {
    registerWithEmailAndPassword(
      email: string,
      password: string,
    ): Promise<void>;
    loginWithEmailAndPassword(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
  }

  export interface IRootApi {
    auth: Nullable<IAuthApi>;
    transactions: Nullable<ITransactionsApi>;
    users: Nullable<IUsersApi>;
    organizations: Nullable<IOrganizationsApi>;
  }
}
