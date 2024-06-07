import { Models, Nullable, RemoteShapes } from 'src/shared/types';
import { merge } from 'src/shared/utils/merge';
import { makeAutoObservable } from 'mobx';

import ITransaction = Models.ITransaction;
import ITransactionShape = RemoteShapes.ITransactionShape;

export class TransactionDomain implements ITransaction {
  id: string = '';

  requestNumber: number = 0;

  checkCode: number = 0;

  comment: string = '';

  issuer: Nullable<string> = null;

  employee: Nullable<string> = null;

  status: number = 0;

  transferAmount: number = 0;

  constructor(data: ITransactionShape) {
    merge<ITransactionShape>(data, this);
    makeAutoObservable(this);
  }

  merge(data: ITransaction) {
    merge<ITransaction>(data, this);
  }
}
