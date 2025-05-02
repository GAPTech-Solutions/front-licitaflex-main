import BaseError from "./baseError";

export default class NotFoundError extends BaseError {
  constructor(message: string) {
    super(404, message);
  }
}
