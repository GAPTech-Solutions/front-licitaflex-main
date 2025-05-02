import { Usuario } from "./Usuario";

export interface Representante {
  usuario: Usuario;
  cargo: string;
  registroGeral: string;
  nome: string;
  tipoRepresentante: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}
