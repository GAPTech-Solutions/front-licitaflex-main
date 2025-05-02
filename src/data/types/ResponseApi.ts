export interface ResponseApi<T> {
  menssagem: string;
  dados: T;
  page?: number;
  pageSize?: number;
  total?: number;
  numberOfPages?: number;
  createdAt: string;
}
