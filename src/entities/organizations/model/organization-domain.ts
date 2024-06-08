import { Models, Nullable, RemoteShapes } from 'src/shared/types';
import { merge } from 'src/shared/utils/merge';
import { makeAutoObservable } from 'mobx';

import IOrganization = Models.IOrganization;
import IOrganizationShape = RemoteShapes.IOrganizationShape;
import { Timestamp } from 'firebase/firestore';

export class OrganizationDomain implements IOrganization {
  id: string = '';

  accountOpeningDate: Nullable<Timestamp> = null;

  countryOfRegistration: string = '';

  branch: string = '';

  company: string = '';

  country_of_registration: string = '';

  okved: string = '';

  inn: string = '';

  constructor(data: IOrganizationShape) {
    merge<IOrganizationShape>(data, this);

    console.log({data});

    makeAutoObservable(this);
  }

  get name() {
    return this.company;
  }

  get type() {
    return 'Юридическое лицо';
  }
}
