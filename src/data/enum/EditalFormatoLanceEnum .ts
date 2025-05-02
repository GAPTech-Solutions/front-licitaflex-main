export enum EditalFormatoLanceEnum {
  Unitario = 1,
  Global = 2,
}

export namespace EditalFormatoLanceEnum {
  export function toString(
    tipoUsuarioEntidade: EditalFormatoLanceEnum
  ): string {
    switch (tipoUsuarioEntidade) {
      case EditalFormatoLanceEnum.Unitario:
        return "Unitário";
      case EditalFormatoLanceEnum.Global:
        return "Global";
    }
  }
}
