import { IEntityModel } from 'src/shared/types';

export interface IGlobalUI {
  isFallbackVisible: boolean;
  version: string;
  displayFallback(state: boolean): void;
}

export interface IGlobalConfig extends IEntityModel<string> {}
