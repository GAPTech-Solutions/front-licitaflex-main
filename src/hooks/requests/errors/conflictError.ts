import BaseError from "./baseError";

export default class ConflictError extends BaseError {
  constructor(message: string) {
    super(409, message);
  }
}
