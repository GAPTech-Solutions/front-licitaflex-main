export default function omitKeys<
  Key extends string,
  T extends Record<Key, any>
>(source: T, key: Key | string[]): Omit<T, Key> {
  const copy = { ...source };
  if (typeof key === "string") {
    delete copy[key];
    return copy;
  }
  key.forEach((k) => delete copy[k as Key]);
  return copy;
}
