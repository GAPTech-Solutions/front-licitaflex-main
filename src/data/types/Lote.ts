import { Item } from "./Item";

export interface Lote {
  sequencia: number;
  tipoItens: number;
  marcaFabricante: boolean;
  documentosProposta: boolean;
  alterarDescricao: boolean;
  descricaoLote: string;
  intervaloLance: number;
  tipoBeneficio: number;
  sigilioso: boolean;
  items: Item[];
  status: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  valorTotal: number;
}
