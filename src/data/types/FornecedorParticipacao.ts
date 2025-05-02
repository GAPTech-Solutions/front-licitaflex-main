import { Documento } from "./Documento";
import { FornecedorItemParticipacao } from "./FornecedorItemParticipacao";

export interface FornecedorParticipacao {
  naoIncorreCondicoes: boolean;
  atendeRequisitosHabilitacao: boolean;
  reservaCargoDeficiencia: boolean;
  propostaEmConformidade: boolean;
  entendimentoCustosTrabalhista: boolean;
  cienteCondicoesEdital: boolean;
  condicoesTrabalho: boolean;
  items: FornecedorItemParticipacao[];
  documentos: Documento[];
  enquadramento: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}
