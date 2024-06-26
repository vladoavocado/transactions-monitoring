import { Models, Nullable } from 'src/shared';
import { EntityModel } from 'src/shared/model';
import dayjs, { Dayjs } from 'dayjs';
import { action, computed, makeObservable, observable } from 'mobx';

import IRootModel = Models.IRootModel;
import IChat = Models.IChat;
import IChatsModel = Models.IChatsModel;

export class ChatsList extends EntityModel<IChat> implements IChatsModel {
  private showFrom: Nullable<Dayjs> = null;

  private showTo: Nullable<Dayjs> = null;

  active: Nullable<IChat> = null;

  constructor(private readonly store: IRootModel) {
    super();

    makeObservable<ChatsList, 'showFrom' | 'showTo'>(this, {
      showFrom: observable,
      showTo: observable,
      visible: computed,
      setActive: action,
      setVisibleRange: action,
    });
  }

  setActive(chatId: string) {
    this.active = this.find(chatId) ?? null;
  }

  setVisibleRange({
    showFrom,
    showTo,
  }: {
    showFrom: Dayjs | null;
    showTo: Dayjs | null;
  }) {
    if (showFrom || showFrom === null) {
      this.showFrom = showFrom;
    }

    if (showTo || showTo === null) {
      this.showTo = showTo;
    }
  }

  get visible() {
    const { values } = this;

    if (this.showFrom && this.showTo) {
      return values.filter(({ createdAt }) => {
        const day = dayjs(createdAt.seconds * 1000).startOf('day');
        return (
          day.isAfter(this.showFrom?.subtract(1, 'day')) &&
          day.isBefore(this.showTo?.add(1, 'day'))
        );
      });
    }

    if (this.showFrom) {
      return values.filter(({ createdAt }) => {
        const day = dayjs(createdAt.seconds * 1000).startOf('day');
        return day.isAfter(this.showFrom?.subtract(1, 'day'));
      });
    }

    if (this.showTo) {
      return values.filter(({ createdAt }) => {
        const day = dayjs(createdAt.seconds * 1000).startOf('day');
        return day.isAfter(this.showTo?.add(1, 'day'));
      });
    }

    return this.values;
  }
}
