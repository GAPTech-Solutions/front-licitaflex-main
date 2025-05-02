export enum TipoRepresentanteFornecedorEnum {
  Administrador = 1,
  Procurador = 2,
  Representante = 3,
}

export namespace TipoRepresentanteFornecedorEnum {
  export function toString(
    tipoRepresentante: TipoRepresentanteFornecedorEnum
  ): string {
    switch (tipoRepresentante) {
      case TipoRepresentanteFornecedorEnum.Administrador:
        return "Administrador";
      case TipoRepresentanteFornecedorEnum.Procurador:
        return "Procurador";
      case TipoRepresentanteFornecedorEnum.Representante:
        return "Representante";
    }
  }
}
