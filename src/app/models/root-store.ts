import { GlobalUi } from 'src/shared/model/global-ui';
import { Nullable, Models } from 'src/shared';
import { logger } from 'src/shared/utils';

import IAccountModel = Models.IAccountModel;
import IAuthModel = Models.IAuthModel;
import IRootModel = Models.IRootModel;

export class RootStore implements IRootModel {
  ui = new GlobalUi(this);

  account: Nullable<IAccountModel> = null;

  auth: Nullable<IAuthModel> = null;

  constructor(
    models: { key: keyof IRootModel; Model: new (...args: any[]) => any }[],
  ) {
    if (!Array.isArray(models)) {
      throw new TypeError('There is no models provided so far.');
    }

    models.forEach(({ key, Model }) => {
      try {
        (this as any)[key] = new Model(this);
      } catch (err) {
        logger.error(
          `The Model: ${Model} cannot be called within new keyword.`,
        );
      }
      if (key in this) {
        (this as any)[key] = new Model();
      }
    });

    Object.freeze(this);
  }
}
