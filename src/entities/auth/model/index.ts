import { makeAutoObservable } from 'mobx';
import type { RootStore } from 'src/app/models';
import { Models, Nullable } from 'src/shared';

import IAuthModel = Models.IAuthModel;

export class AuthModel implements IAuthModel {
  refreshToken: Nullable<string> = null;

  constructor(private readonly store: RootStore) {
    makeAutoObservable<AuthModel, 'root'>(this, {
      root: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  setToken(token: Nullable<string>) {
    this.refreshToken = token || null;
  }

  resetToken() {
    this.setToken(null);
  }

  get hasToken() {
    return Boolean(this.refreshToken);
  }
}
