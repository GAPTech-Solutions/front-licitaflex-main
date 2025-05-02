import { CardLicita } from "@/Components/layout/CardLicita";
import LabelText from "@/Components/Text/LabelText";
import { Lote } from "@/data/types/Lote";
import { Button, Flex, Tag } from "@chakra-ui/react";
import { useSalaDisputa } from "../SalaDisputaContext";
import TextPercente from "@/Components/Text/TextPercente";
import TextMoney from "@/Components/Text/TextMoney";
import { EditalFormatoLanceEnum } from "@/data/enum/EditalFormatoLanceEnum ";
import { LoteFaseDisputaEnum } from "@/data/enum/LoteFaseDisputaEnum";
import { LoteSalaDisputa } from "@/data/types/EditalSalaDisputa";
import useSalaDisputaPregoeiro from "../useSalaDisputaPregoeiro";
import Cronometro from "./Cronometro";
import VisivelEntidade from "@/Components/Visivel/VisivelEntidade";
import VisivelFornecedor from "@/Components/Visivel/VisivelFornecedor";
import AcoesFornecedor from "./AcoesFornecedor";
import { LoteStatusEnum } from "@/data/enum/LoteStatusEnum";
import AcoesPregoeiro from "./AcoesPregoeiro";
type CardLoteItemProps = {
  lote: LoteSalaDisputa;
};
export default function CardLoteItem(props: CardLoteItemProps) {
  const { lote } = props;
  const { loteAtivo, setLoteAtivo, edital, fornecedorId } = useSalaDisputa();
  const cronometro = lote?.cronometros?.find((c) => c.status > 4);
  const borderColor =
    loteAtivo == lote.id ? "var(--azul-3, #0D69D9)" : "light.4";
  const marginLeft = loteAtivo == lote.id ? "0.5rem" : undefined;
  const marginRight = loteAtivo == lote.id ? undefined : "0.5rem";
  return (
    <CardLicita
      as="article"
      position="relative"
      borderRadius="6px"
      border="1px solid"
      borderColor={borderColor}
      padding="2rem 2rem 1rem 2rem"
      marginRight={marginRight}
      marginLeft={marginLeft}
      direction="column"
      gap="0.5rem"
      label={`Lote ${lote.sequencia}`}
      onClick={() => setLoteAtivo(lote.id)}
    >
      <Flex gap="1rem" justifyContent="space-between">
        <Flex direction="column" gap="1rem">
          <LabelText label="Intervalo" prefixo="">
            {edital?.tipoTaxa ? (
              <TextPercente>{lote.intervaloLance}</TextPercente>
            ) : (
              <TextMoney>{lote.intervaloLance}</TextMoney>
            )}
          </LabelText>
          <LabelText label="Melhor Lance" prefixo="">
            <TextMoney>{lote.lances?.[0].valorLance}</TextMoney>
          </LabelText>
        </Flex>
        <Flex direction="column" gap="1rem">
          <LabelText label="Formato">
            {EditalFormatoLanceEnum.toString(edital?.formatoLance ?? 0)}
          </LabelText>
          {fornecedorId && (
            <LabelText label="Seu Lance">
              <TextMoney>
                {
                  lote.lances?.find((l) => l.fornecedorId == fornecedorId)
                    ?.valorLance
                }
              </TextMoney>
            </LabelText>
          )}
        </Flex>
        <Flex direction="column" gap="1rem">
          <LabelText label="Tempo">
            {cronometro ? (
              <Cronometro
                key={cronometro.key}
                ativo={!!cronometro}
                dataInicio={cronometro?.dataInicio}
                dataFinal={cronometro?.dataFinalizacao}
              />
            ) : (
              <>00:00:00</>
            )}
          </LabelText>
        </Flex>
        <Flex direction="column" gap="1rem">
          <Flex justifyContent="flex-end">
            <Tag>{LoteStatusEnum.toString(lote.status)}</Tag>
          </Flex>
          <VisivelEntidade>
            <AcoesPregoeiro loteId={lote.id} />
          </VisivelEntidade>
          <VisivelFornecedor>
            <AcoesFornecedor loteId={lote.id} />
          </VisivelFornecedor>
        </Flex>
      </Flex>
      <Flex>
        <LabelText label="Objeto">{lote.descricaoLote}</LabelText>
      </Flex>
    </CardLicita>
  );
}
