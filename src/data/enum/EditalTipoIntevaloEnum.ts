export enum EditalTipoIntevaloEnum {
  MenorPreco = 1,
  MaiorDesconto = 2,
  MaiorPreco = 3,
}

export namespace EditalTipoIntevaloEnum {
  export function toString(
    tipoUsuarioEntidade: EditalTipoIntevaloEnum
  ): string {
    switch (tipoUsuarioEntidade) {
      case EditalTipoIntevaloEnum.MenorPreco:
        return "Menor Preço";
      case EditalTipoIntevaloEnum.MaiorPreco:
        return "Maior Preço";
      case EditalTipoIntevaloEnum.MaiorDesconto:
        return "Maior Desconto";
    }
  }
}
