import { BaseApi } from 'src/shared/api';
import { RemoteShapes } from 'src/shared/types/shapes';
import { Models, ReactiveApi } from 'src/shared';
import { FirebaseDatabase } from 'src/shared/api/firestore-database';

import { OrganizationDomain } from 'src/entities/organizations/model';
import IRootApi = ReactiveApi.IRootApi;
import IRootModel = Models.IRootModel;
import IOrganizationShape = RemoteShapes.IOrganizationShape;
import IOrganization = Models.IOrganization;
import IOrganizationsApi = ReactiveApi.IOrganizationsApi;

export class OrganizationsApi
  extends BaseApi<IOrganizationShape, IOrganization>
  implements IOrganizationsApi
{
  protected path: string = 'organizations';

  // eslint-disable-next-line class-methods-use-this
  protected toModel(shape: IOrganizationShape) {
    return new OrganizationDomain(shape);
  }

  constructor(
    protected readonly root: IRootModel,
    protected readonly api: IRootApi,
  ) {
    super(api, root, new FirebaseDatabase());

    this.listen();
  }

  // eslint-disable-next-line class-methods-use-this
  onUpdate(data: IOrganization | IOrganization[]) {
    if (Array.isArray(data)) {
      data.forEach(organization => {
        this.root.organizations?.addOrUpdate(organization.id, organization);
      });
    } else {
      this.root.organizations?.addOrUpdate(data.id, data);
    }
  }
}
