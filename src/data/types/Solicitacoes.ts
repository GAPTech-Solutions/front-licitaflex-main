import { Documento } from "./Documento";
import { Usuario } from "./Usuario";

export interface Solicitacoes {
  id: string;
  descricao: string;
  dataEnvio: string;
  documentoSolicitante?: Documento;
  resposta?: string;
  dataResposta?: string;
  documentoResposta?: Documento;
  publicarNaAta: boolean;
  solicitante: Usuario;
  status: number;
  ouvidor?: Usuario;
  tipoSolicitacao: number;
  createdAt: string;
  updatedAt: string;
}
