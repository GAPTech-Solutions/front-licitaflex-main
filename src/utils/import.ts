import { isFunction } from "./is";

export function importResolve(resolve: object) {
  const values = Object.entries(resolve);
  const types = [];
  const components = [];
  for (const value of values) {
    if (isFunction(value[1])) {
      components.push(value[1]);
      continue;
    }
    types.push(value[1]);
  }
  return { types, components };
}
