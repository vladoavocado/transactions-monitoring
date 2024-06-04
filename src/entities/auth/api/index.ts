/* eslint-disable no-underscore-dangle */
import { RootStore } from 'src/app/models';
import { ReactiveApi } from 'src/shared';
import { action, makeAutoObservable, observable } from 'mobx';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { logger } from 'src/shared/utils';

import IRootApi = ReactiveApi.IRootApi;
import IAuthApi = ReactiveApi.IAuthApi;

export class AuthApi implements IAuthApi {
  private thirdPartyAuth = getAuth();

  isPending: boolean = false;

  constructor(private store: RootStore, private api: IRootApi) {
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
        this.store.account?.parse(user);
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

      this.store.account?.parse(user);
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
      const { user } = await signInWithEmailAndPassword(
        this.thirdPartyAuth,
        email,
        password,
      );

      this.store.account?.parse(user);
      this.store.auth?.setToken(user.refreshToken);
    } catch (err) {
      logger.error(err);
      throw err;
    } finally {
      this._transitState('isPending', false);
    }
  }
}
