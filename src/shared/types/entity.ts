export interface IEntity<T> {
  addOrUpdate(id: string, data: T): void;
  toArray(): T[];
  toString(): string;
  has(id: string): boolean;
  remove(id: string): boolean;
  find(id: string): T | undefined;
  clear(): void;
  deserialize(data: string): void;
  serialize(): string;
  keys: string[];
  values: T[];
  size: number;
}
