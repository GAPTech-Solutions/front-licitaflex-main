type DTO = Record<string, any>;
type LiteralType = string | number | boolean | bigint;

type GetDirtyDTOKeys<O extends DTO> = {
  [K in keyof O]-?: NonNullable<O[K]> extends Array<infer A>
    ? NonNullable<A> extends LiteralType
      ? K
      :
          | Extract<K, string>
          | (K extends string
              ? GetDirtyDTOKeys<NonNullable<A>> extends infer NK
                ? NK extends string
                  ? `${K}.${NK}`
                  : never
                : never
              : K)
    : NonNullable<O[K]> extends LiteralType
    ? K
    :
        | Extract<K, string>
        | (K extends string
            ? GetDirtyDTOKeys<NonNullable<O[K]>> extends infer NK
              ? NK extends string
                ? `${K}.${NK}`
                : never
              : never
            : never);
}[keyof O];
type AllDTOKeys = string | number | symbol;
type TrashDTOKeys = `${string}.undefined` | number | symbol;
type ExcludeTrashDTOKeys<O extends AllDTOKeys> = O extends TrashDTOKeys
  ? never
  : O;
export type GetDTOKeys<O extends DTO> = ExcludeTrashDTOKeys<GetDirtyDTOKeys<O>>;

export default function getObjectKey<T extends object, P extends GetDTOKeys<T>>(
  obj: T,
  path: P
) {
  const keys = path.toString().split(".");
  let result: object | LiteralType = obj;
  for (const key of keys) {
    const keyResult = result[key as keyof typeof result] as
      | LiteralType
      | object;
    result = keyResult;
  }
  return result;
}
