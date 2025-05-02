import BaseError from "./baseError";

export default class ServerExceptionError extends BaseError {
  constructor(message: string) {
    super(500, message);
  }
}
