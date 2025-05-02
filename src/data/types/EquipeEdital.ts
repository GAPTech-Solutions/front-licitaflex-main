import { TipoUsuarioEntidadePublicaEnum } from "../enum/TipoUsuarioEntidadePublicaEnum";

export interface EquipeEdital {
  tipoUsuarioEntidadePublica: TipoUsuarioEntidadePublicaEnum;
  id: string;
  createdAt: string;
  updatedAt: string;
  usuarioId: string;
  nome: string;
}
