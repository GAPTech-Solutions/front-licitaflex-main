import { useSalaDisputa } from "../SalaDisputaContext";
import { Button } from "@chakra-ui/react";
import useSalaDisputaPregoeiro from "../useSalaDisputaPregoeiro";
import { LoteStatusEnum } from "@/data/enum/LoteStatusEnum";

type AcoesPregoeiroProps = {
  loteId: string;
};
const format = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  style: "currency",
  maximumFractionDigits: 5,
  minimumFractionDigits: 5,
});
export default function AcoesPregoeiro(props: AcoesPregoeiroProps) {
  const { lotes } = useSalaDisputa();
  const lote = lotes[props.loteId];
  const {
    iniciarDisptuaLote,
    isLoadingIniciarDisputa,
    iniciarDesempate,
    isLoadingDesempate,
    iniciarNegociacao,
    isLoadingNegociacao,
    declararVencedor,
    isLoadingVencedor,
  } = useSalaDisputaPregoeiro();

  if (lote.status == LoteStatusEnum.Aguardando) {
    return (
      <Button
        size="sm"
        onClick={() => iniciarDisptuaLote(lote)}
        isLoading={isLoadingIniciarDisputa}
      >
        Iniciar disputa
      </Button>
    );
  }
  if (lote.status == LoteStatusEnum.Empate) {
    return (
      <Button
        size="sm"
        onClick={() => iniciarDesempate(lote)}
        isLoading={isLoadingDesempate}
      >
        Iniciar Desempate
      </Button>
    );
  }
  if (
    lote.status == LoteStatusEnum.Negocicao &&
    lote.forncedoresAptosLance == null
  ) {
    return (
      <>
        <Button
          size="sm"
          onClick={() => iniciarNegociacao(lote)}
          isLoading={isLoadingNegociacao}
        >
          Solicitar um lance melhor
        </Button>
        <Button
          size="sm"
          onClick={() => declararVencedor(lote)}
          isLoading={isLoadingVencedor}
        >
          Declarar vencedor
        </Button>
      </>
    );
  }
  if (lote.status == LoteStatusEnum.Negocicao) {
    const fornecedor = lote.lances.find(
      (l) => l.fornecedorId == lote.forncedoresAptosLance[0]
    );
    return (
      <>
        <span>
          Aguardando lance <b>{fornecedor?.apelido}</b>
        </span>
        <Button
          size="sm"
          onClick={() => declararVencedor(lote)}
          isLoading={isLoadingVencedor}
        >
          Declarar vencedor
        </Button>
      </>
    );
  }
  return <></>;
}
