import { Models, RemoteShapes } from 'src/shared/types';
import { merge } from 'src/shared/utils/merge';
import { makeAutoObservable } from 'mobx';
import { Timestamp } from 'firebase/firestore';

import IMessage = Models.IMessage;
import IMessageShape = RemoteShapes.IMessageShape;

export class MessageDomain implements IMessage {
  id: string = '';

  chatId: string = '';

  createdAt: Timestamp = {} as Timestamp;

  author: string = '';

  text: string = '';

  constructor(data: IMessageShape) {
    merge<IMessageShape>(data, this);
    makeAutoObservable(this);
  }

  merge(data: IMessage) {
    merge<IMessage>(data, this);
  }
}
