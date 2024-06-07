import { Models } from 'src/shared';
import { EntityModel } from 'src/shared/model';

import IRootModel = Models.IRootModel;
import IOrganization = Models.IOrganization;
import IOrganizationsModel = Models.IOrganizationsModel;

export class OrganizationsList
  extends EntityModel<IOrganization>
  implements IOrganizationsModel
{
  constructor(private readonly store: IRootModel) {
    super();
  }
}
