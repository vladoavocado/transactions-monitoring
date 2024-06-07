/* eslint-disable no-underscore-dangle, no-useless-catch, require-yield */
import { action, makeObservable, observable, runInAction } from 'mobx';
import { Models, ReactiveApi } from 'src/shared';
import { logger } from 'src/shared/utils';

// ** Types
import IRootApi = ReactiveApi.IRootApi;
import IBaseApi = ReactiveApi.IBaseApi;
import IApiState = ReactiveApi.IApiState;
import IDatabase = ReactiveApi.IDatabase;
import IDatabaseQuery = ReactiveApi.IDatabaseQuery;
import IDatabaseSubscription = ReactiveApi.IDatabaseSubscription;
import IRootModel = Models.IRootModel;

export abstract class BaseApi<TData extends Record<string, any>, TResult>
  implements IBaseApi<TData, TResult>, IApiState
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
    protected store: IRootModel,
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

  protected abstract toModel(data: TData): TResult;

  abstract onUpdate(data: TResult | TResult[]): void;

  async fetch(query?: IDatabaseQuery) {
    this.isFetching = true;
    try {
      const data = await this.db.get<TData>(this.path, query);

      if (Array.isArray(data)) {
        return data.map(item => this.toModel(item));
      }

      return this.toModel(data);
    } finally {
      runInAction(() => {
        this.isFetching = false;
      });
    }
  }

  async createOrUpdate(data: TData, uid?: string) {
    this.isUpdating = true;
    try {
      return await this.db.set<TData, TResult>(this.path, data, uid);
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
      return this.db.subscribe<TData | TData[]>(this.path, data => {
        if (Array.isArray(data)) {
          const models = data.map(item => this.toModel(item));

          return this.onUpdate(models);
        }

        return this.onUpdate(this.toModel(data));
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}
/* eslint-enable no-underscore-dangle, no-useless-catch, require-yield */
