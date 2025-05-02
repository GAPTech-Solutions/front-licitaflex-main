export enum LoteStatusEnum {
  Aguardando = 0,
  Disputa = 1,
  Empate = 2,
  Negocicao = 3,
  Decisao = 4,
  Contrato = 5,
  Finalizado = 6,
}

export namespace LoteStatusEnum {
  export function toString(status: LoteStatusEnum): string {
    switch (status) {
      case LoteStatusEnum.Aguardando:
        return "Aguardando";
      case LoteStatusEnum.Disputa:
        return "Em Disputa";
      case LoteStatusEnum.Empate:
        return "Lote Empatado";
      case LoteStatusEnum.Negocicao:
        return "Lote em Negocição";
      case LoteStatusEnum.Decisao:
        return "Em Decisão";
      case LoteStatusEnum.Contrato:
        return "Contrato";
      case LoteStatusEnum.Finalizado:
        return "Finalizado";
    }
  }
}
