import { WhereFilterOp } from 'firebase/firestore';
import { Nullable } from 'src/shared';

export namespace ReactiveApi {
  type IApiOptions = Record<string, any>;

  export type IDatabaseSubscription = () => void;

  export interface IDatabaseQuery {
    fieldPath: string;
    filter: WhereFilterOp;
    value: unknown;
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  export interface IDatabase {
    get<T>(path: string, queryObj?: IDatabaseQuery): Promise<T>;
    post<D extends Record<string, any>, T>(path: string, data: D): Promise<T>;
    put<D extends Record<string, any>, T>(path: string, data: D): Promise<T>;
    patch<D extends Record<string, any>, T>(path: string, data: D): Promise<T>;
    delete<T>(path: string, id: string): Promise<T>;
    subscribe<T>(
      path: string,
      onUpdate: (data: T) => void,
      queryObj?: IDatabaseQuery,
    ): IDatabaseSubscription[];
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  export interface IBaseApi<
    TData extends Record<string, any> | Record<string, any>[],
    TResult,
  > {
    fetch(query?: IDatabaseQuery): Promise<TResult>;
    createOrUpdate(data: TData, options: IApiOptions): Promise<TResult>;
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
  }
}
