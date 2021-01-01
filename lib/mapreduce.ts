export type Id = string;

export interface Doc {
  id: Id;
  type: string;
}

export type JsonPrimitive = number | string | boolean | null;

export type JsonEntry = JsonPrimitive | JsonArray | JsonMap;

export type JsonArray = JsonEntry[];

export type JsonMap = {
  [key: string]: JsonEntry;
};

export type Key = JsonEntry;
export type Value = JsonEntry;

export type EmitFunction<K extends Key = Key, V extends Value = Value> = (
  key: K,
  value?: V
) => void;

export type Operation = Function;
export type OperationSource<T extends Operation> = string;
export type OperationPath<T extends Operation> = string;

export type MapFunction<
  D extends Doc = Doc,
  K extends Key = Key,
  V extends Value = Value
> = Operation & ((doc: D) => void); //N.B. Unreferenced K and V constrain the (late-bound) emit() called by the map.
export type ReduceFunction<
  K extends Key = Key,
  V extends any = any,
  R extends Key = Key
> = Operation & ((keys: K[], values: V[], rereduce: boolean) => R);

export interface IndexDef<
  D extends Doc,
  K extends Key,
  V extends Value,
  R extends Key
> {
  name: IndexName;
  map: OperationSource<MapFunction<D, K, V>>;
  reduce?: OperationSource<ReduceFunction<K, V, R>>;
}

export type IndexName = string;

export type IndexMap<D extends Doc> = {
  [N in IndexName]: IndexDef<D, any, any, any>;
};

type Xor<A extends object, B extends object> =
  | (A & { [k in keyof B]?: never })
  | (B & { [k in keyof A]?: never });

type AllOrNothing<T> = T | { [K in keyof T]?: never };

type KeyBounds<K extends Key> = {
  startKey: K;
} & Xor<{ endKey: K }, { limit: number }>;

type IdBounds<I extends Id> = {
  startId: I;
} & Xor<{ endId: I }, { limit: number }>;

type Fields<D extends Doc> = {
  fields: [keyof D];
};

export type ByDoc<D extends Doc> = {
  id: D["id"];
  type: D["type"];
} & AllOrNothing<Fields<D>>;

export type ByType<D extends Doc> = {
  type: D["type"];
} & AllOrNothing<Fields<D>> &
  AllOrNothing<IdBounds<D["id"]>>;

export type ByIndex<D extends Doc, K extends Key> = {
  name: IndexName;
} & AllOrNothing<Fields<D>> &
  AllOrNothing<KeyBounds<K>>;

export abstract class Store<D extends Doc = Doc> {
  constructor(readonly indexMap: IndexMap<D>) {}
  abstract saveDoc(doc: D): Promise<void>;
  abstract loadDoc<T extends D = D>(options: ByDoc<T>): Promise<T>;
  abstract loadType<T extends D>(options: ByType<T>): AsyncGenerator<T>;
  abstract loadIndex<T extends D = D, K extends Key = Key>(
    options: ByIndex<T, K>
  ): AsyncGenerator<T>;
}
