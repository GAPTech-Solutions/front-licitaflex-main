import isFunction from "./is/isFunction";
import isObject from "./is/isObject";

const isObjectClonable = (data: unknown): boolean => {
  const isArray = Array.isArray(data);
  return (
    !(data instanceof Blob || data instanceof FileList) &&
    (isArray || isObject(data))
  );
};

export default function cloneObject<T>(data: T): T {
  let copy: any;
  const isArray = Array.isArray(data);

  if (data instanceof Date) {
    copy = new Date(data);
    return copy;
  }
  if (data instanceof Set) {
    copy = new Set(data);
    return copy;
  }
  if (isObjectClonable(data)) {
    copy = isArray ? [] : {};
    for (const key in data) {
      if (isFunction(data[key])) {
        copy = data;
        break;
      }
      copy[key] = cloneObject(data[key]);
    }
    return copy;
  }
  return data;
}
