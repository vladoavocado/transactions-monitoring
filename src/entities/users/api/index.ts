import { BaseApi } from 'src/shared/api';
import { RemoteShapes } from 'src/shared/types/shapes';
import { Models, ReactiveApi } from 'src/shared';
import { FirebaseDatabase } from 'src/shared/api/firestore-database';
import { UserDomain } from 'src/entities/users/model';

import IUsersApi = ReactiveApi.IUsersApi;
import IUserShape = RemoteShapes.IUserShape;
import IUser = Models.IUser;
import IRootApi = ReactiveApi.IRootApi;
import IRootModel = Models.IRootModel;

export class UsersApi extends BaseApi<IUserShape, IUser> implements IUsersApi {
  protected path: string = 'users';

  // eslint-disable-next-line class-methods-use-this
  protected toModel(shape: IUserShape) {
    return new UserDomain(shape);
  }

  constructor(
    protected readonly root: IRootModel,
    protected readonly api: IRootApi,
  ) {
    super(api, root, new FirebaseDatabase());

    this.listen();
  }

  // eslint-disable-next-line class-methods-use-this
  onUpdate(data: IUser | IUser[]) {
    if (Array.isArray(data)) {
      data.forEach(user => {
        this.root.users?.addOrUpdate(user.id, user);
      });
    } else {
      this.root.users?.addOrUpdate(data.id, data);
    }
  }
}
