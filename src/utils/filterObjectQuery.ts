import isDateObject from "./is/isDateObject";
import isNullOrUndefined from "./is/isNullOrUndefined";
import isPrimitive from "./is/isPrimitive";

export default function filterObjectQuery<T extends Object>(
  objects: T[],
  query: string
): T[] {
  return objects.filter(
    (object) =>
      Object.keys(object).filter((key) => {
        const keyName = key as keyof T;
        const value = object[keyName];
        if (isDateObject(value)) return false;
        if (isNullOrUndefined(value)) return false;
        if (isPrimitive(value))
          return String(value).toLocaleLowerCase().includes(query);
        return false;
      }).length > 0
  );
}
