import { Nullable } from 'src/shared';

export namespace Models {
  export interface IAccountServer {
    displayName: Nullable<string>;
    photoURL: Nullable<string>;
    email: Nullable<string>;
    phoneNumber: Nullable<string>;
    uid: string;
  }

  export interface IAccount extends IAccountServer {}

  export interface IAccountModel extends IAccount {
    parse(data: IAccountServer): void;
  }

  export interface IAuthModel {
    setToken(token: Nullable<string>): void;
    resetToken(): void;
    hasToken: boolean;
  }

  export interface IRootModel {
    auth: Nullable<IAuthModel>;
    account: Nullable<IAccountModel>;
  }
}
