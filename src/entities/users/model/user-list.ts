import { Models } from 'src/shared';
import { EntityModel } from 'src/shared/model';

import IUsersModel = Models.IUsersModel;
import IUser = Models.IUser;
import IRootModel = Models.IRootModel;

export class UsersList extends EntityModel<IUser> implements IUsersModel {
  constructor(private readonly store: IRootModel) {
    super();
  }

  get employees() {
    return this.values.filter(user => user.role === 2);
  }
}
