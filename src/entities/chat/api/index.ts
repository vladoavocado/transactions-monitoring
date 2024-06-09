import { Models, ReactiveApi, RemoteShapes } from 'src/shared';
import { TransactionDomain } from 'src/entities/transactions/model';
import { FirebaseDatabase } from 'src/shared/api/firestore-database';
import { BaseApi } from 'src/shared/api';

import { ChatDomain } from 'src/entities/chat/model/chat-domain';
import IRootModel = Models.IRootModel;
import IRootApi = ReactiveApi.IRootApi;
import IChatsApi = ReactiveApi.IChatsApi;
import IChatShape = RemoteShapes.IChatShape;
import IChat = Models.IChat;

export class ChatsApi extends BaseApi<IChatShape, IChat> implements IChatsApi {
  protected path: string = 'chats';

  constructor(
    protected readonly root: IRootModel,
    protected readonly api: IRootApi,
  ) {
    super(api, root, new FirebaseDatabase());

    this.listen();
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  protected toModel(data: IChatShape): IChat {
    return new ChatDomain(data);
  }

  async getMessages() {}

  // eslint-disable-next-line class-methods-use-this
  onUpdate(data: IChat[] | IChat) {
    const { chats } = this.root;

    if (Array.isArray(data)) {
      data.forEach(chat => {
        const entry = chats?.find(chat.id);

        if (entry) {
          entry?.merge?.(chat);
        }

        chats?.addOrUpdate(chat.id, chat);
      });
    } else {
      chats?.addOrUpdate(data.id, data);
    }
  }
}
