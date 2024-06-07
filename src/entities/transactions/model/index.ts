import { EntityModel } from 'src/shared/model';
import { Models } from 'src/shared/types';
import ITransactionsModel = Models.ITransactionsModel;
import ITransaction = Models.ITransaction;
import IRootModel = Models.IRootModel;

export class TransactionsModel
  extends EntityModel<ITransaction>
  implements ITransactionsModel
{
  constructor(private readonly root: IRootModel) {
    super();
  }
}
