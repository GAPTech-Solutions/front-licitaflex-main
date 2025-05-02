import { EditalTipoIntevaloEnum } from "../enum/EditalTipoIntevaloEnum";
import { Documento } from "./Documento";
import { EquipeEdital } from "./EquipeEdital";
import { Lote } from "./Lote";
import { Segmento } from "./Segmento";
import { Solicitacoes } from "./Solicitacoes";
import { Usuario } from "./Usuario";

export interface Mensagem {
  id: string;
  message: string;
  usuario: Usuario;
  typeMessage: number;
  documento?: Documento;
  enviadoFornecedor: boolean;
  loteId: string;
}

export interface MensagemResponse {
  id: string;
  message: string;
  typeMessage: number;
  editalId: string;
  loteId: string;
  lote: number;
  entidadePublicaId?: string;
  fornecedorId: string;
  createdAt: string;
  updatedAt: string;
  enviadoFornecedor: boolean;
  autor: string;
}
