import { logger } from 'src/shared/utils';

import { Models, Nullable, ReactiveApi } from 'src/shared/types';

import IRootApi = ReactiveApi.IRootApi;
import IAuthApi = ReactiveApi.IAuthApi;
import IRootModel = Models.IRootModel;

/* eslint-disable no-underscore-dangle */
export class RootApi implements IRootApi {
  auth: Nullable<IAuthApi> = null;

  constructor(
    store: IRootModel,
    apis: { key: keyof IRootApi; Api: new (...args: any[]) => any }[],
  ) {
    if (!Array.isArray(apis)) {
      throw new TypeError('There is no models provided so far.');
    }

    apis.forEach(({ key, Api }) => {
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
