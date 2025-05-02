import BaseError from "./baseError";
type ErrorValue = string[] | Record<string, string[]>;
export type Params = Record<string, ErrorValue>;
export type Violation = {
  propertyPath: string;
  message: string;
};
export default class UnprocessableEntityError extends BaseError {
  public violations: Violation[];
  constructor(message: string, violation: Violation[]) {
    super(422, message);
    this.violations = violation;
  }
}

export function isUnprocessableEntityError(
  value: unknown
): value is UnprocessableEntityError {
  const valueTeste = value as UnprocessableEntityError;

  return Array.isArray(valueTeste?.violations);
}
