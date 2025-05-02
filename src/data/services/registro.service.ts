import Axios from "axios";
import RegistroUsuario from "../dto/registro.usuario";
import { ResponseApi } from "../types/ResponseApi";
import { Usuario } from "../types/Usuario";
import { ServiceBase } from "./service.base";

export default class RegistroService extends ServiceBase {
  protected getNameRecurso(): string {
    return "registrar";
  }

  async registrar(dto: RegistroUsuario) {
    const usuario = this.post<RegistroUsuario, ResponseApi<Usuario>>("", dto);
    return usuario;
  }
}

export function useRegistroService() {
  return new RegistroService(Axios);
}
