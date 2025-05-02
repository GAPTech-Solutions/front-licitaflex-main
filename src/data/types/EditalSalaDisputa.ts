import { FornecedorEnquadramentoEnum } from "../enum/FornecedorEnquadramentoEnum";
import { LoteFaseDisputaEnum } from "../enum/LoteFaseDisputaEnum";
import { Lote } from "./Lote";

export interface EditalSalaDisputa {
  id: string;
  modalidade: number;
  amparoLegal: number;
  entidadePublicaId: string;
  entidadePublica: string;
  origemRecurso: any;
  pregoeiro: string;
  pregoeiroId: string;
  convenioRecurso: any;
  registroPreco: boolean;
  prazoValidade: any;
  permitidoCarona: any;
  numeroProcesso: string;
  numeroPregao: string;
  tipoIntervalo: number;
  numeroDotacaoOrcamentaria: string;
  modoDisputa: number;
  formatoLance: number;
  dataPublicacaoPlataforma: any;
  dataPublicacaoDiario: string;
  dataInicioDisputa: string;
  dataLimiteImpugnacao: string;
  preferenciaRegional: boolean;
  numeroCasasDecimaisLance: number;
  ordemFase: number;
  objetoEdital: string;
  lotes: LoteSalaDisputa[];
  propostas: LoteSalaDisputaProposta[];
  status: number;
  tipoTaxa: boolean;
  autoridadeSuperiorId: string;
  autoridadeSuperior: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoteSalaDisputa {
  id: string;
  intervaloLance: number;
  faseDisputa: LoteFaseDisputaEnum;
  documentosProposta: boolean;
  marcaFabricante: boolean;
  sequencia: number;
  sigiloso: boolean;
  tipoBeneficio: number;
  tipoItens: number;
  status: number;
  descricaoLote: string;
  alterarDescricao: boolean;
  createdAt: string;
  updatedAt: string;
  items: LoteItemSalaDisputa[];
  propostas: LoteSalaDisputaProposta[];
  lances: LoteSalaDisputaLance[];
  cronometros?: LoteSalaDisputaCronometro[];
  valorTotal: string;
  forncedoresAptosLance: string[];
}

export interface LoteItemSalaDisputa {
  descricao: string;
  sequencia: number;
  quantidade: number;
  unidadeMedida: string;
  valorTotal: string;
  valorUnitario: string;
}

export interface LoteSalaDisputaProposta {
  id: string;
  fornecedorId: string;
  enquadramento: number;
  loteId: string;
  items: LoteSalaDisputaPropostaItem[];
  apelido: string;
  valorTotal: string;
  valorUnitario: string;
  valorGlobal: string;
}

export interface LoteSalaDisputaPropostaItem {
  itemId: string;
  valor: string;
  sequencia: number;
}

export interface LoteSalaDisputaLance {
  id: string;
  fornecedorId: string;
  enquadramento: FornecedorEnquadramentoEnum;
  loteId: string;
  valorUnitario: string;
  valorGlobal: string;
  valorLance: string;
  status: number;
  apelido: string;
}

export interface LoteSalaDisputaCronometro {
  id: string;
  dataInicio: string;
  dataFinalizacao: string;
  dataPausa: any;
  status: number;
  tempoRandomico: any;
  key: string;
}
