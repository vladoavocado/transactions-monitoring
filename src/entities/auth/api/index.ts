/* eslint-disable no-underscore-dangle */
import { RootModel } from 'src/app/models';
import { Models, ReactiveApi } from 'src/shared';
import { action, makeAutoObservable, observable } from 'mobx';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { logger } from 'src/shared/utils';

import IRootApi = ReactiveApi.IRootApi;
import IAuthApi = ReactiveApi.IAuthApi;
import { createInitials } from 'src/shared/utils/create-initials';
import IUser = Models.IUser;

export class AuthApi implements IAuthApi {
  private thirdPartyAuth = getAuth();

  isPending: boolean = false;

  constructor(
    private readonly store: RootModel,
    private readonly api: IRootApi,
  ) {
    makeAutoObservable<
      AuthApi,
      'root' | 'api' | 'token' | 'thirdPartAuth' | '_transitState'
    >(this, {
      root: false,
      api: false,
      thirdPartAuth: false,
      isPending: observable,
      _transitState: action,
      token: observable,
    });

    this.thirdPartyAuth.onAuthStateChanged(user => {
      if (user) {
        this.store.account?.parse({
          id: user.uid,
        });
        this.store.auth?.setToken(user.refreshToken);
      }

      this.store.ui.displayFallback(false);
    });
  }

  private _transitState(state: string, value: boolean) {
    (this as any)[state] = Boolean(value);
  }

  async registerWithEmailAndPassword(email: string, password: string) {
    try {
      this._transitState('isPending', true);

      const { user } = await createUserWithEmailAndPassword(
        this.thirdPartyAuth,
        email,
        password,
      );

      this.store.account?.parse({
        id: user.uid,
      });
      this.store.auth?.setToken(user.refreshToken);
    } catch (err) {
      logger.error(err);
      throw err;
    } finally {
      this._transitState('isPending', false);
    }
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      this._transitState('isPending', true);
      const { user: authUser } = await signInWithEmailAndPassword(
        this.thirdPartyAuth,
        email,
        password,
      );

      this.store.account?.parse({
        id: authUser.uid,
      });
      this.store.auth?.setToken(authUser.refreshToken);
    } catch (err) {
      logger.error(err);
      throw err;
    } finally {
      this._transitState('isPending', false);
    }
  }

  async logout() {
    await this.thirdPartyAuth.signOut().finally(() => {
      this.store.account?.reset();
      this.store.auth?.resetToken();
    });
  }
}
