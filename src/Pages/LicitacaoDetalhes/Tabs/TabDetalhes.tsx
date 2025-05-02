import ButtonFile from "@/Components/buttons/ButtonFile";
import { CardLicita } from "@/Components/layout/CardLicita";
import LabelText from "@/Components/Text/LabelText";
import TextData from "@/Components/Text/TextData";
import TextDataTime from "@/Components/Text/TextDataTime";
import { EditalFormatoLanceEnum } from "@/data/enum/EditalFormatoLanceEnum ";
import { EditalModoDisputaEnum } from "@/data/enum/EditalModoDisputaEnum";
import { EditalTipoIntevaloEnum } from "@/data/enum/EditalTipoIntevaloEnum";
import { Button, Flex, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useLicitacao } from "../contextLicitacao";

export default function TabDetalhes() {
  const { edital: data } = useLicitacao();

  const [expand, setExpand] = useState(false);
  const clickVerMais = () => {
    setExpand((state) => !state);
  };
  const textButton = expand ? "Ler -" : "Ler +";
  const basis = "180px";
  return (
    <Flex direction="column" gap="2rem">
      <Flex gap="2rem">
        <CardLicita label="Perfil do Processo" direction="column" width="289px">
          <LabelText label="Modalidade">Dispensa eletrônica</LabelText>
          <LabelText label="Etapa">Recebendo proposta</LabelText>
          <LabelText label="Dispensa" prefixo="Nº">
            0556565/2023
          </LabelText>
          <LabelText label="Critério">Maior desconto</LabelText>
          <LabelText label="Início da disputa">18/03/2023 | 14:00:00</LabelText>
          <LabelText label="Pregoeiro">{data?.pregoeiro.nome}</LabelText>
          <LabelText label="Telefone">62 9916666294</LabelText>
        </CardLicita>
        <CardLicita label="Descrição" direction="column" flex="1">
          <Flex>
            <Text
              noOfLines={expand ? undefined : 1}
              fontFamily="inter"
              fontWeight="500"
              textAlign="justify"
              fontSize="14px"
            >
              {data?.objetoEdital}
              <Button
                variant="link"
                onClick={clickVerMais}
                marginStart="0.5rem"
                fontFamily="var(--licita-flex-fonts-heading)"
              >
                {textButton}
              </Button>
            </Text>
            {!expand && (
              <Button
                variant="link"
                onClick={clickVerMais}
                marginStart="0.5rem"
              >
                {textButton}
              </Button>
            )}
          </Flex>
          <Flex gap="1rem">
            <LabelText label="Pregão" prefixo="Nº" flexBasis={basis}>
              {data?.numeroPregao}
            </LabelText>
            <LabelText label="Formato" flexBasis={basis}>
              {EditalFormatoLanceEnum.toString(data?.formatoLance!)}
            </LabelText>
            <LabelText label="Data de Publicação no Diário" flexBasis={basis}>
              <TextDataTime>{data?.dataPublicacaoDiario}</TextDataTime>
            </LabelText>
            <LabelText label="Data limite Propostas | Início da disputa">
              <TextDataTime>{data?.dataInicioDisputa}</TextDataTime>
            </LabelText>
          </Flex>

          <Flex gap="1rem">
            <LabelText label="Processo" prefixo="Nº" flexBasis={basis}>
              {data?.numeroProcesso}
            </LabelText>
            <LabelText label="Tipo de intervalo" flexBasis={basis}>
              {EditalTipoIntevaloEnum.toString(data?.tipoIntervalo!)}
            </LabelText>
            <LabelText label="Publicação no Sistema" flexBasis={basis}>
              {data?.dataPublicacaoPlataforma}
            </LabelText>
            <LabelText label="Data limite Impulgnação" flexBasis={basis}>
              <TextData>{data?.dataLimiteImpugnacao}</TextData>
            </LabelText>
          </Flex>
          <Flex gap="1rem">
            <LabelText label="Dotação" prefixo="Nº" flexBasis={basis}>
              {data?.numeroDotacaoOrcamentaria}
            </LabelText>
            <LabelText label="Modo de disputa" flexBasis={basis}>
              {EditalModoDisputaEnum.toString(data?.modoDisputa!)}
            </LabelText>
          </Flex>

          <Flex wrap="wrap" gap="0.5rem" mb="0.5rem" direction="column">
            <Text fontSize="14px" fontWeight="700">
              Segmentos
            </Text>
            <Flex wrap="wrap" gap="0.5rem" mb="0.5rem">
              {data?.segmentos.map((s) => (
                <Tag variant="outline" key={s.id}>
                  {s.atividadeEconomica}
                </Tag>
              ))}
            </Flex>
          </Flex>
        </CardLicita>
      </Flex>
      <Flex gap="2rem">
        <CardLicita label="Atividade" flex="1"></CardLicita>
        <Flex direction="column" gap="1rem">
          {data?.documentos.map((f) => (
            <ButtonFile
              key={f.id}
              arquivo={f.nomeOriginal}
              tamanho={f.tamanho}
              link={f.caminho}
              ext="pdf"
              aria-label="Arquivo"
              background={f.tipoDocumento == 1 ? "dark.6" : "light.2"}
              color={f.tipoDocumento == 1 ? "light.1" : "dark.6"}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
