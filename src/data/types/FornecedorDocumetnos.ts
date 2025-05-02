import { Documento } from "./Documento";
import { Representante } from "./Representante";

export interface FornecedorDocumento {
  id?: string;
  documento: Documento;
  representante?: Representante;
  representanteId?: string;
  status?: number;
  createdAt: string;
  updatedAt: string;
}
