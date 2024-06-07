import { Models, ReactiveApi, RemoteShapes } from 'src/shared';
import { TransactionDomain } from 'src/entities/transactions/model';
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
  protected path: string = 'transactions';

  constructor(
    protected readonly root: IRootModel,
    protected readonly api: IRootApi,
  ) {
    super(api, root, new FirebaseDatabase());

    this.listen();
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  protected toModel(data: ITransactionShape): ITransaction {
    return new TransactionDomain(data);
  }

  // eslint-disable-next-line class-methods-use-this
  onUpdate(data: ITransaction[] | ITransaction) {
    const { transactions } = this.root;

    if (Array.isArray(data)) {
      data.forEach(transaction => {
        const entry = transactions?.find(transaction.id);

        if (entry) {
          entry?.merge?.(transaction);
        }

        transactions?.addOrUpdate(transaction.id, transaction);
      });
    } else {
      transactions?.addOrUpdate(data.id, data);
    }
  }
}
