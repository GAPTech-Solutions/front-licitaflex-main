export enum TipoContaBancariaEnum {
  Corrente = 1,
  Poupanca = 2,
}

export namespace TipoContaBancariaEnum {
  export function toString(tipoUsuarioEntidade: TipoContaBancariaEnum): string {
    switch (tipoUsuarioEntidade) {
      case TipoContaBancariaEnum.Corrente:
        return "Corrente";
      case TipoContaBancariaEnum.Poupanca:
        return "Poupança";
    }
  }
}
