
export interface CadastroFornecedor {
  id?: string;
  tipoFornecedor: number;
  cnpj?: string;
  cpf?: string;
  pisNit?: string;
  isento?: boolean;
  inscricaoEstadual?: string;
  razaoSocial: string;
  nomeFantasia: string;
  emailLicitacao: string;
  emailFinanceiro: string;
  celularLicitacao: string;
  celularFinanceiro: string;
  pais: string;
}
