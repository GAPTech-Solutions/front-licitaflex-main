export enum LoteFaseDisputaEnum {
  Aguardando = 0,
  DisputaAberta = 1,
  DisputaCompetitiva = 2,
  DisputaRandomica = 3,
  DisputaFechada = 4,
  DisputaEncerrada = 5,
  Desempate = 6,
  Negociacao = 7,
}

export namespace LoteFaseDisputaEnum {
  export function toString(status: LoteFaseDisputaEnum): string {
    switch (status) {
      case LoteFaseDisputaEnum.DisputaAberta:
        return "Disputa Aberta";
      case LoteFaseDisputaEnum.DisputaCompetitiva:
        return "Disputa Competitiva";
      case LoteFaseDisputaEnum.DisputaRandomica:
        return "Disputa Randomica";
      case LoteFaseDisputaEnum.DisputaFechada:
        return "Disputa Fechada";
      case LoteFaseDisputaEnum.Desempate:
        return "Desempate";
      case LoteFaseDisputaEnum.Negociacao:
        return "Negociação";
      case LoteFaseDisputaEnum.DisputaEncerrada:
        return "Disputa Encerrada";
      default:
        return "Aguardando";
    }
  }
}
