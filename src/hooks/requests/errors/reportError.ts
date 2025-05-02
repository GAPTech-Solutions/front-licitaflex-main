import { AxiosError, AxiosResponse } from "axios";
import BadRequestError from "./badRequest";
import BaseError from "./baseError";
import ConflictError from "./conflictError";
import GenericError from "./genericError";
import NotFoundError from "./notFoundError";
import ServerExceptionError from "./serverExceptionError";
import UnprocessableEntityError, {
  Violation,
} from "./unprocessableEntity";

type ResponseGenericError = {
  message: string;
  type: string;
  violations?: Violation[];
};
const errorResponse: Record<
  number,
  (response: ResponseGenericError) => BaseError
> = {
  500: () => new ServerExceptionError("Ocorreu um erro no servidor"),
  404: (response) => new NotFoundError(response?.message ?? ""),
  422: (response) =>
    new UnprocessableEntityError(response?.message, response.violations ?? []),
  409: (response) => new ConflictError(response?.message ?? ""),
  400: (response) => new BadRequestError(response?.message ?? ""),
};
export default function reportError(error: unknown): BaseError {
  if ((error as AxiosError).isAxiosError) {
    const errorAxios = error as AxiosError;
    if (errorAxios.code === "ERR_NETWORK") {
      return new BaseError(500, "Algo deu errado!");
    }
    if (errorAxios.code === "ECONNABORTED") {
      return new BaseError(408, errorAxios.message);
    }
    const { status = 500, data } = errorAxios.response as AxiosResponse;
    return (
      errorResponse[parseInt(status.toString())]?.(data) || new GenericError()
    );
  }
  if (error instanceof BaseError) {
    return error;
  }

  return new GenericError();
}
