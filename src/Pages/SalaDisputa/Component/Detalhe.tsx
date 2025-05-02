import { IconHistory } from "@/Components/icons";
import { IconCaixa } from "@/Components/icons/iconCaixa";
import { IconInfo2 } from "@/Components/icons/iconInfo2";
import { IconMartelo } from "@/Components/icons/iconMartelo";
import { IconSendMessage } from "@/Components/icons/iconSendMessage";
import { Flex, Table, Tag, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { ContainerDatelheCss } from "../style";
import ItemDetalhe from "./ItemDetalhe";
import { useSalaDisputa } from "../SalaDisputaContext";
import TextMoney from "@/Components/Text/TextMoney";
import Cronometro, { CronometroProps } from "./Cronometro";
import { useEffect, useState } from "react";
import { NotificacaoLote } from "@/data/types/NotificacaoLote";
import { LoteFaseDisputaEnum } from "@/data/enum/LoteFaseDisputaEnum";
import LinhaFornecedor from "./LinhaFornecedor";

export default function Detalhe() {
  const { lote, fornecedorId, edital } = useSalaDisputa();
  const cronometro = lote?.cronometros?.find((c) => c.status > 4);
  return (
    <ContainerDatelheCss>
      <ItemDetalhe title={`LOTE ${lote?.sequencia}`} iconRight={IconInfo2}>
        <Flex
          paddingInline="1rem"
          alignItems="center"
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap="0.5rem">
            <IconHistory />
            {cronometro ? (
              <Cronometro
                key={cronometro.key}
                ativo={!!cronometro && cronometro.status !== 4}
                dataFinal={cronometro?.dataFinalizacao}
                dataInicio={cronometro?.dataInicio}
              />
            ) : (
              <>00:00:00</>
            )}
          </Flex>
          {lote?.faseDisputa && (
            <Tag key={`${lote.id}.${lote?.faseDisputa}`}>
              {LoteFaseDisputaEnum.toString(lote.faseDisputa)}
            </Tag>
          )}
        </Flex>
      </ItemDetalhe>
      <ItemDetalhe title="Lances" iconLeft={IconMartelo}>
        <Table size="sm" fontSize="14px">
          <Tbody>
            {lote?.lances?.map((l, i) => (
              <Tr key={l.id}>
                <Td _first={{ paddingInline: "1rem" }} paddingInline="0">
                  {i + 1}º
                </Td>
                <Td fontWeight="700" paddingInline="0">
                  <TextMoney>{l.valorLance}</TextMoney>
                </Td>
                <Td paddingInline="0">
                  <LinhaFornecedor
                    apelido={l.apelido}
                    enquadramento={l.enquadramento}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ItemDetalhe>
      <ItemDetalhe title="Propostas" iconLeft={IconSendMessage}>
        <Table size="sm" fontSize="14px">
          <Tbody>
            {lote?.propostas.map((f) => (
              <Tr key={`${f.fornecedorId}.${f.valorTotal}`}>
                <Td _first={{ paddingInline: "1rem" }} paddingInline="0">
                  <TextMoney>
                    {edital?.formatoLance == 1
                      ? f.valorUnitario
                      : f.valorGlobal}
                  </TextMoney>
                </Td>
                <Td paddingInline="0">
                  {f.fornecedorId == fornecedorId ? (
                    <Tag fontWeight="semibold" colorScheme="azul">
                      {f.apelido}
                    </Tag>
                  ) : (
                    f.apelido
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ItemDetalhe>
      <ItemDetalhe title="Itens" iconLeft={IconCaixa}>
        <Table size="sm" fontSize="14px">
          <Tbody>
            {lote?.items.map((i) => (
              <Tr key={i.sequencia}>
                <Td _first={{ paddingInline: "1rem" }} paddingInline="0">
                  01
                </Td>
                <Td paddingInline="0">{i.descricao}</Td>
                <Td paddingInline="0">
                  <TextMoney>{i.valorUnitario}</TextMoney>
                </Td>
                <Td paddingInline="0">
                  {i.quantidade} {i.unidadeMedida}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ItemDetalhe>
    </ContainerDatelheCss>
  );
}
