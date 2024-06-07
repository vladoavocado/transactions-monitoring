import { computed, makeObservable, observable } from 'mobx';
import { Nullable } from 'src/shared';
import { Models } from 'src/shared/types';

import IAccountModel = Models.IAccountModel;
import IAccountServer = Models.IAccountServer;
import IRootModel = Models.IRootModel;

export class AccountModel implements IAccountModel {
  id: Nullable<string> = null;

  constructor(private readonly root: IRootModel) {
    makeObservable<AccountModel, 'userRef'>(this, {
      id: observable,
      userRef: computed,
    });
  }

  parse(user: IAccountServer) {
    this.id = user.id;
  }

  reset() {
    this.id = null;
  }

  private get userRef() {
    if (!this.id || this.root.users?.size === 0) {
      return null;
    }

    return this.root.users?.find(this.id);
  }

  get displayName() {
    return this.userRef?.initials ?? null;
  }

  get role() {
    const userRole = this.userRef?.role;

    switch (userRole) {
      case 1:
        return 'Руководитель отдела';
      case 2:
        return 'Ведущий экономист';
      case 3:
        return 'Клиент';
      default:
        return null;
    }
  }
}
