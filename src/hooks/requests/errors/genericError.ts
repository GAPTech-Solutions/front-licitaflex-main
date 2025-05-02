import BaseError from "./baseError";

export default class GenericError extends BaseError {
  constructor() {
    super(500, "Erro desconhecido");
  }
}
