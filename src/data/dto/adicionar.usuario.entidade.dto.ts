import { TipoUsuarioEntidadePublicaEnum } from "../enum/TipoUsuarioEntidadePublicaEnum";

export default interface AdicionarUsuarioEntidadeDto {
  cpfUsuario: string;
  tipoUsuarioEntidade: TipoUsuarioEntidadePublicaEnum;
}
