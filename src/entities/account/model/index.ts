import { makeAutoObservable } from 'mobx';
import { Nullable } from 'src/shared';
import { Models } from 'src/shared/types';
import { nanoid } from 'nanoid';

import IAccountModel = Models.IAccountModel;
import IAccountServer = Models.IAccountServer;

export class AccountModel implements IAccountModel {
  displayName: Nullable<string> = null;

  photoURL: Nullable<string> = null;

  email: Nullable<string> = null;

  phoneNumber: Nullable<string> = null;

  uid: Nullable<string> = null;

  constructor() {
    makeAutoObservable<AccountModel>(this);
  }

  parse(user: IAccountServer) {
    Object.keys(user).forEach(prop => {
      if (prop in this) {
        (this as any)[prop] = user[prop as keyof IAccountServer];
      }
    });
  }

  clear() {
    this.displayName = null;
    this.photoURL = null;
    this.email = null;
    this.phoneNumber = null;
    this.uid = null;
  }
}
