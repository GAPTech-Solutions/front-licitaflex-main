export enum TipoUsuarioEntidadePublicaEnum {
  AutoridadeSuperior = 1,
  Pregoeiro = 2,
  EquipeAuxiliar = 3,
}

export namespace TipoUsuarioEntidadePublicaEnum {
  export function toString(
    tipoUsuarioEntidade: TipoUsuarioEntidadePublicaEnum
  ): string {
    switch (tipoUsuarioEntidade) {
      case TipoUsuarioEntidadePublicaEnum.AutoridadeSuperior:
        return "Autoridade Superior";
      case TipoUsuarioEntidadePublicaEnum.EquipeAuxiliar:
        return "Equipe Auxiliar";
      case TipoUsuarioEntidadePublicaEnum.Pregoeiro:
        return "Pregoeiro";
    }
  }
}
