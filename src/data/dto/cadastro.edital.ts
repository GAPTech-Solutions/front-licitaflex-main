import { EditalTipoIntevaloEnum } from "../enum/EditalTipoIntevaloEnum";
import { Lote } from "../types/Lote";
import { Segmento } from "../types/Segmento";
import AdicionarAnexoEditalDto from "./adicionar.anexo.edital.dto";

export interface CadastroEditalDto {
  id?: string;
  modalidade: number;
  amparoLegal: number;
  autoridadeSuperior: string;
  pregoeiro: string;
  equipeApoio: string[];
  convenio: boolean;
  origemRecurso?: number;
  convenioRecurso?: string;
  registroPreco: boolean;
  prazoValidade?: number;
  permitidoCarona?: boolean;
  numeroProcesso: string;
  numeroPregao: string;
  numeroDotacaoOrcamentaria: string;
  tipoIntervalo: EditalTipoIntevaloEnum;
  tipoTaxa: boolean;
  modoDisputa: number;
  dataPublicacaoDiario: string;
  dataInicioDisputa: string;
  dataLimiteImpugnacao: string;
  numeroCasasDecimaisLance: number;
  ordemFase: number;
  objetoEdital: string;
  formatoLance: number;
  documentos: AdicionarAnexoEditalDto[];
  lotes?: Lote[];
  segmentos?: Segmento[];
}
