import { makeAutoObservable } from 'mobx';
import { Models, Nullable, RemoteShapes } from 'src/shared/types';
import { merge } from 'src/shared/utils/merge';

import IUser = Models.IUser;
import IUserShape = RemoteShapes.IUserShape;

export class UserDomain implements IUser {
  id: string = '';

  firstName: string = '';

  lastName: string = '';

  patronymic: Nullable<string> = null;

  email: string = '';

  initials: string = '';

  inn: Nullable<string> = null;

  jobLink: Nullable<string> = null;

  jobTitle: Nullable<string> = null;

  passportInfo: Nullable<string> = null;

  role: number = 3;

  constructor(data: IUserShape) {
    merge<IUserShape>(data, this);
    makeAutoObservable(this);
  }

  get name() {
    return this.initials;
  }
}
