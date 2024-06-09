import { Models, RemoteShapes } from 'src/shared/types';
import { merge } from 'src/shared/utils/merge';
import { makeAutoObservable } from 'mobx';
import { Timestamp } from 'firebase/firestore';

import IChat = Models.IChat;
import IChatShape = RemoteShapes.IChatShape;

export class ChatDomain implements IChat {
  id: string = '';

  createdAt: Timestamp = {} as Timestamp;

  customer: string = '';

  employee: string = '';

  title: string = '';

  constructor(data: IChatShape) {
    merge<IChatShape>(data, this);
    makeAutoObservable(this);
  }

  merge(data: IChat) {
    merge<IChat>(data, this);
  }
}
