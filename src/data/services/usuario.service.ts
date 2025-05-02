import useHttpRequest from "@/hooks/useHttpRequest";
import { Usuario } from "../types/Usuario";
import { ServiceBase } from "./service.base";

export default class UsuarioService extends ServiceBase {
  protected getNameRecurso(): string {
    return "usuario";
  }

  async obterUsuarioCpf(cpf: string) {
    return this.get<Usuario>(`cpf/${cpf}`);
  }

  async existeUsuarioCpf(cpf: string) {
    return this.get<boolean>(`existe/${cpf}`);
  }
  async obterMeusDados() {
    return this.get<Usuario>("");
  }
}

export function useUsuarioService() {
  const http = useHttpRequest(false);

  return new UsuarioService(http);
}
