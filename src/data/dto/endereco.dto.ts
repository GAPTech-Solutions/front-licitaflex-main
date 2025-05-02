export interface EnderecoDTO {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  codigoIbge: number;
  estado?: string;
}
