import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Base } from "../types/Base";
import { ResponseApi } from "../types/ResponseApi";

type Data<T, D> = D extends object[]
  ? D
  : D extends object
  ? D
  : T extends Partial<Base>[]
  ? T
  : T extends Partial<Base>
  ? T
  : never;

export type DataCreate<T, D = unknown> = D extends object
  ? D
  : T extends Partial<Base>
  ? T
  : never;

export type ResponseService<T, D = unknown> = ResponseApi<Data<T, D>>;

type ConfigRequest = AxiosRequestConfig;

export abstract class ServiceBase {
  constructor(protected readonly http: AxiosInstance) {}

  protected abstract getNameRecurso(): string;

  protected getRecurso(path?: string | number): string {
    if (path) return `${this.getNameRecurso()}/${path ?? ""}`;
    return this.getNameRecurso();
  }

  protected async post<D = any, R = ResponseApi<D>>(
    path: string | number,
    data: D,
    config?: ConfigRequest
  ) {
    const url = this.getRecurso(path);
    const result = await this.http.post<R>(url, data, config);
    return result.data;
  }

  protected async patch<D = any, R = ResponseApi<D>>(
    path: string | number,
    data: D,
    config?: ConfigRequest
  ) {
    const url = this.getRecurso(path);
    const result = await this.http.patch<R>(url, data, config);
    return result.data;
  }

  protected async put<D = any, R = ResponseApi<D>>(
    path: string | number,
    data: D,
    config?: ConfigRequest
  ) {
    const url = this.getRecurso(path);
    const result = await this.http.put<R>(url, data, config);
    return result.data;
  }

  protected async get<D = any, R = ResponseApi<D>>(
    path: string | number,
    config?: ConfigRequest
  ) {
    const url = this.getRecurso(path);
    const result = await this.http.get<R>(url, config);
    return result.data;
  }

  protected async delete<R = ResponseApi<null>>(
    path: string | number,
    config?: ConfigRequest
  ) {
    const url = this.getRecurso(path);
    const result = await this.http.delete<R>(url, config);
    return result.data;
  }

  protected async postFormData<D = any, R = ResponseApi<D>>(
    path: string | number,
    data: FormData,
    config?: ConfigRequest
  ) {
    const url = this.getRecurso(path);
    const result = await this.http.post<R>(url, data, config);
    return result.data;
  }
}
