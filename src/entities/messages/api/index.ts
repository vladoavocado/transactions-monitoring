import { Models, ReactiveApi, RemoteShapes } from 'src/shared';
import { FirebaseDatabase } from 'src/shared/api/firestore-database';
import { BaseApi } from 'src/shared/api';

import { MessageDomain } from 'src/entities/messages/model';
import IRootModel = Models.IRootModel;
import IRootApi = ReactiveApi.IRootApi;
import IChatMessagesApi = ReactiveApi.IMessagesApi;
import IMessageShape = RemoteShapes.IMessageShape;
import IMessage = Models.IMessage;

export class MessagesApi
  extends BaseApi<IMessageShape, IMessage>
  implements IChatMessagesApi
{
  protected path: string = 'messages';

  constructor(
    protected readonly root: IRootModel,
    protected readonly api: IRootApi,
  ) {
    super(api, root, new FirebaseDatabase());

    this.listen();
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  protected toModel(data: IMessageShape): IMessage {
    return new MessageDomain(data);
  }

  async getMessages() {}

  // eslint-disable-next-line class-methods-use-this
  onUpdate(data: IMessage[] | IMessage) {
    const { messages } = this.root;

    if (Array.isArray(data)) {
      data.forEach(message => {
        const entry = messages?.find(message.id);

        if (entry) {
          entry?.merge?.(message);
        }

        messages?.addOrUpdate(message.id, message);
      });
    } else {
      messages?.addOrUpdate(data.id, data);
    }
  }
}
