export default class BaseError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this);
    // }
  }
}
