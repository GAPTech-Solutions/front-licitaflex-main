export enum EditalStatusEnum {
  Rascunho = 0,
  Publicado = 1,
  Disputa = 2,
  Decisao = 3,
  Contrato = 4,
  Finalizado = 5,
}

export namespace EditalStatusEnum {
  export function toString(status: EditalStatusEnum): string {
    switch (status) {
      case EditalStatusEnum.Rascunho:
        return "Rascunho";
      case EditalStatusEnum.Publicado:
        return "Publicado";
      case EditalStatusEnum.Disputa:
        return "Disputa";
      case EditalStatusEnum.Decisao:
        return "Decisão";
      case EditalStatusEnum.Contrato:
        return "Contrato";
      case EditalStatusEnum.Finalizado:
        return "Finalizado";
    }
  }
}
