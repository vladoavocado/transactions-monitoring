import { Models, RemoteShapes } from 'src/shared/types';
import { merge } from 'src/shared/utils/merge';
import { makeAutoObservable } from 'mobx';

import IOrganization = Models.IOrganization;
import IOrganizationShape = RemoteShapes.IOrganizationShape;

export class OrganizationDomain implements IOrganization {
  id: string = '';

  accountOpeningDate: string = '';

  countryOfRegistration: string = '';

  branch: string = '';

  company: string = '';

  country_of_registration: string = '';

  okved: string = '';

  inn: string = '';

  constructor(data: IOrganizationShape) {
    merge<IOrganizationShape>(data, this);

    makeAutoObservable(this);
  }

  get name() {
    return this.company;
  }
}
