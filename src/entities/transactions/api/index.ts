import { Models, ReactiveApi, RemoteShapes } from 'src/shared';
import { FirebaseDatabase } from 'src/shared/api/firestore-database';
import { BaseApi } from 'src/shared/api';

import IRootModel = Models.IRootModel;
import IRootApi = ReactiveApi.IRootApi;
import ITransactionsApi = ReactiveApi.ITransactionsApi;
import ITransactionShape = RemoteShapes.ITransactionShape;
import ITransaction = Models.ITransaction;

export class TransactionsApi
  extends BaseApi<ITransactionShape, ITransaction>
  implements ITransactionsApi
{
  constructor(
    protected readonly root: IRootModel,
    protected readonly api: IRootApi,
  ) {
    super(api, root, new FirebaseDatabase());
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  protected toModel(data: ITransactionShape): ITransaction {
    // @ts-ignore
    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  async onUpdate() {
    return Promise.resolve();
  }
}
