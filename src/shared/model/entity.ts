import { isArray, isObject } from 'lodash/fp';
import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
  toJS,
} from 'mobx';
import { IEntityModel } from '../types/entity';
import { logger } from '../utils';

type PrivateFields = 'byId';

/* eslint-disable no-underscore-dangle */
export class EntityModel<T> implements IEntityModel<T> {
  private byId: ObservableMap<string, T> = observable.map({});

  constructor() {
    makeObservable<EntityModel<T>, PrivateFields>(this, {
      byId: observable,
      has: action,
      remove: action,
      find: action,
      clear: action,
      toArray: action,
      serialize: action,
      deserialize: action,
      addOrUpdate: action,
      keys: computed,
      values: computed,
      size: computed,
    });
  }

  private static _toArray(data: any, unwrap: boolean = false) {
    if (typeof data !== 'object') {
      return [];
    }
    const transformedData = unwrap ? toJS(data) : data;

    return Array.from(transformedData).map(item =>
      unwrap ? toJS(item) : item,
    );
  }

  addOrUpdate(id: string, data: T) {
    this.byId.set(id, data);
  }

  toArray() {
    return this.values;
  }

  toString() {
    return this.serialize();
  }

  has(id: string) {
    return this.byId.has(id);
  }

  remove(id: string) {
    return this.byId.delete(id);
  }

  find(id: string) {
    return this.byId.get(id);
  }

  clear() {
    this.byId.clear();
  }

  deserialize(data: string) {
    try {
      const parsed = JSON.parse(data);

      if (isArray(parsed)) {
        logger.info(`Entity: Can not use array indexes to store in the map.`);
        return;
      }

      if (isObject(parsed)) {
        Object.entries(parsed).forEach(([key, value]) => {
          this.addOrUpdate(key, value);
        });
      }
    } catch (err) {
      logger.error(`Entity: Failed to deserialize data.`, data);
    }
  }

  serialize() {
    try {
      const raw = toJS(this.byId);
      return JSON.stringify(raw);
    } catch (err) {
      logger.error(`Entity: Failed to serialize data.`);
      return '';
    }
  }

  get keys() {
    return EntityModel._toArray(this.byId) as string[];
  }

  get values() {
    return EntityModel._toArray(this.byId.values()) as T[];
  }

  get rawValues() {
    return EntityModel._toArray(this.byId.values(), true) as T[];
  }

  get size() {
    return this.byId.size;
  }
}

/* eslint-enable no-underscore-dangle */
