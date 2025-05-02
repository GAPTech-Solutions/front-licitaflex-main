export const __DEV__ = import.meta.env.NODE_ENV !== "production";
export const cx = (...classNames: any[]) =>
  classNames.filter(Boolean).join(" ");
