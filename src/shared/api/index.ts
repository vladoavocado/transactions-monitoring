/* eslint-disable no-underscore-dangle, no-useless-catch, require-yield */
import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from 'src/app/models/root-store';
import { ReactiveApi } from 'src/shared';
import { logger } from 'src/shared/utils';

// ** Types
import IRootApi = ReactiveApi.IRootApi;
import IBaseApi = ReactiveApi.IBaseApi;
import IApiState = ReactiveApi.IApiState;
import IDatabase = ReactiveApi.IDatabase;
import IDatabaseQuery = ReactiveApi.IDatabaseQuery;
import IDatabaseSubscription = ReactiveApi.IDatabaseSubscription;

export abstract class BaseApi<
  TData extends Record<string, any> | Record<string, any>[],
  TResult,
> implements IBaseApi<TData, TResult>, IApiState
{
  protected path: string = '';

  protected listeners: IDatabaseSubscription[] = [];

  isFetching: boolean = true;

  isCreating: boolean = false;

  isDeleting: boolean = false;

  isUpdating: boolean = false;

  isPatching: boolean = false;

  constructor(
    protected api: IRootApi,
    protected store: RootStore,
    private db: IDatabase,
  ) {
    makeObservable<BaseApi<TData, TResult>, 'api' | 'store' | 'db'>(this, {
      api: false,
      store: false,
      db: false,
      isFetching: observable,
      isCreating: observable,
      isDeleting: observable,
      isPatching: observable,
      isUpdating: observable,
      createOrUpdate: action,
      fetch: action,
      delete: action,
    });
  }

  abstract onUpdate(): void;

  async fetch(query?: IDatabaseQuery) {
    this.isFetching = true;
    try {
      return this.db.get<TResult>(this.path, query);
    } finally {
      runInAction(() => {
        this.isFetching = false;
      });
    }
  }

  async createOrUpdate(data: TData) {
    this.isUpdating = true;
    try {
      return await this.db.put<TData, TResult>(this.path, data);
    } finally {
      runInAction(() => {
        this.isUpdating = false;
      });
    }
  }

  async delete(id: string) {
    this.isDeleting = true;
    try {
      return await this.db.delete<TResult>(this.path, id);
    } finally {
      runInAction(() => {
        this.isDeleting = false;
      });
    }
  }

  listen() {
    try {
      return this.db.subscribe<TResult>(this.path, this.onUpdate);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
/* eslint-enable no-underscore-dangle, no-useless-catch, require-yield */
