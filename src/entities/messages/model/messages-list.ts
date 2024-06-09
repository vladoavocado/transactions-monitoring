import { Models } from 'src/shared';
import { EntityModel } from 'src/shared/model';

import IRootModel = Models.IRootModel;
import IMessage = Models.IMessage;
import IMessagesModel = Models.IMessagesModel;

export class MessagesList
  extends EntityModel<IMessage>
  implements IMessagesModel
{
  constructor(private readonly store: IRootModel) {
    super();
  }

  get visible() {
    const { active } = this.store.chats || {};

    if (active) {
      return this.values.filter(message => message.chatId === active.id);
    }

    return this.values;
  }
}
