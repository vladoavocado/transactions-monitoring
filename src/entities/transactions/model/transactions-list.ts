import { Models, Nullable } from 'src/shared';
import { EntityModel } from 'src/shared/model';
import { action, makeObservable, observable } from 'mobx';

import IRootModel = Models.IRootModel;
import ITransaction = Models.ITransaction;
import ITransactionsModel = Models.ITransactionsModel;

export class TransactionsList
  extends EntityModel<ITransaction>
  implements ITransactionsModel
{
  active: Nullable<ITransaction> = null;

  constructor(private readonly root: IRootModel) {
    super();

    makeObservable(this, {
      active: observable,
      setActive: action,
    });
  }

  setActive(id: Nullable<string>) {
    const transaction = this.find(id ?? '');
    this.active = transaction || null;
  }

  canEdit(transaction: ITransaction) {
    const isAdmin = this.root.account?.isAdmin;
    const [, employeeId] = transaction?.employee?.split('/') ?? [];

    if (transaction?.status && !isAdmin) {
      return false;
    }

    return Boolean(isAdmin || employeeId === this.root?.account?.id);
  }

  get visible() {
    const { isAdmin, id } = this.root.account ?? {};

    if (isAdmin) {
      return this.values;
    }

    return this.values.filter(transaction =>
      transaction?.employee?.includes(id ?? ''),
    );
  }
}
