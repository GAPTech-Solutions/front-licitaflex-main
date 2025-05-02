/* eslint-disable import/no-anonymous-default-export */
export default (value: unknown): value is string => typeof value === "string";
