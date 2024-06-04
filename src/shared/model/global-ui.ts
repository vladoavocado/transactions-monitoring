import { makeAutoObservable, observable, ObservableMap } from 'mobx';
import type { RootStore } from 'src/app/models';
import { IGlobalUI } from 'src/shared/types/global-ui';

/* eslint-disable no-underscore-dangle */
export class GlobalUi implements IGlobalUI {
  version: string = process.env.REACT_APP_VERSION as string;

  isFallbackVisible: boolean = true;

  cooldownByVersion: ObservableMap<string, number> = observable.map();

  constructor(private readonly store: RootStore) {
    this.store = store;

    makeAutoObservable<GlobalUi, 'store' | '_forceRefresh'>(this, {
      store: false,
      _forceRefresh: observable,
    });
  }

  displayFallback(state: boolean) {
    this.isFallbackVisible = state;
  }
}
/* eslint-enable no-underscore-dangle */
