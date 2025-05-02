export enum FornecedorEnquadramentoEnum {
  ME = 1,
  EPP = 2,
  OUTRO = 3,
}

export namespace FornecedorEnquadramentoEnum {
  export function toString(status: FornecedorEnquadramentoEnum): string {
    switch (status) {
      case FornecedorEnquadramentoEnum.ME:
        return "ME";
      case FornecedorEnquadramentoEnum.EPP:
        return "EPP";
      case FornecedorEnquadramentoEnum.OUTRO:
        return "Outro";
    }
  }
}
