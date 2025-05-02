import DadosFinanceiro from "./DadosFinanceiro";
import { Endereco } from "./Endereco";
import { FornecedorDocumento } from "./FornecedorDocumetnos";
import Pais from "./Pais";
import { Representante } from "./Representante";
import { Usuario } from "./Usuario";

export default interface Fornecedor {
  tipoFornecedor: number;
  cnpj: string;
  inscricaoEstadual: any;
  razaoSocial: string;
  nomeFantasia: string;
  endereco: Endereco;
  emailLicitacao: string;
  emailFinanceiro: string;
  celularLicitacao: string;
  celularFinanceiro: string;
  pisNit: any;
  dadosFinanceiros: DadosFinanceiro[];
  representantes: Representante[];
  documentos: FornecedorDocumento[];
  cpf: any;
  usuarioCadastro: Usuario;
  pais: Pais;
  propostas: any[];
  id: string;
  createdAt: string;
  updatedAt: string;
}
