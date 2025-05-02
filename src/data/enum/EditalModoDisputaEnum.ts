export enum EditalModoDisputaEnum {
  Aberto = 1,
  AbertoFechado = 2,
}

export namespace EditalModoDisputaEnum {
  export function toString(tipoUsuarioEntidade: EditalModoDisputaEnum): string {
    switch (tipoUsuarioEntidade) {
      case EditalModoDisputaEnum.Aberto:
        return "Aberto";
      case EditalModoDisputaEnum.AbertoFechado:
        return "Aberto e Fechado";
    }
  }
}
