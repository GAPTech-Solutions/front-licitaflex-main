import isDateObject from "./isDateObject";
import isNullOrUndefined from "./isNullOrUndefined";

export const isObjectType = (value: unknown) => typeof value === "object";

// eslint-disable-next-line import/no-anonymous-default-export
export default <T extends object>(value: unknown): value is T =>
  !isNullOrUndefined(value) &&
  !Array.isArray(value) &&
  isObjectType(value) &&
  !isDateObject(value);
