export default function filterObjectKey<T extends Object | unknown>(
  objects: T[],
  key: keyof T,
  values: any[]
): T[] {
  return objects.filter((object) => values.includes(object[key]));
}
