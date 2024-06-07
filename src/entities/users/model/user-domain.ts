import { Models, Nullable, RemoteShapes } from 'src/shared/types';
import { toCamelCase } from 'src/shared/utils';

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
    Object.entries(data).forEach(([key, value]) => {
      const transformedKey = toCamelCase(key);

      if (transformedKey in this) {
        (this as any)[transformedKey] = value;
      }
    });
  }
}
