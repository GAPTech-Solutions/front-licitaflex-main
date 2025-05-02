import cloneObject from "./cloneObject";

export default function getItensPageObject<T extends Object | unknown>(
  objeto: T[],
  page: number,
  limit: number
): T[] {
  const start = (page - 1) * limit;
  if (start > objeto.length) return [];
  const end = Math.min(page * limit, objeto.length);
  return cloneObject(objeto).splice(start, end);
}
