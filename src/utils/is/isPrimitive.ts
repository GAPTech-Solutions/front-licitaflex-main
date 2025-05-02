import isNullOrUndefined from "./isNullOrUndefined";
import { isObjectType } from "./isObject";

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;
// eslint-disable-next-line import/no-anonymous-default-export
export default (value: unknown): value is Primitive =>
  isNullOrUndefined(value) || !isObjectType(value);
