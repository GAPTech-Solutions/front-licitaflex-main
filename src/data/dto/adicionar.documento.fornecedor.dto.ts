export default interface AdicionarDocumentoFornecedorDto {
  id?: string;
  arquivo: string;
  tipoDocumento: number;
  idRepresentante?: string;
  link?: string;
}
