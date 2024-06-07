export type Nullable<T> = T | null;

type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S;

export type ConvertSnakeToCamelCase<T> = {
  [K in keyof T as SnakeToCamel<Extract<K, string>>]: T[K] extends object
    ? ConvertSnakeToCamelCase<T[K]>
    : T[K];
};
