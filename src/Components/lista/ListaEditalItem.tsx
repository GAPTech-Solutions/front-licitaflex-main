import { Edital } from "@/data/types/Edital";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Tag,
  Text,
} from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import LabelText from "../Text/LabelText";
import TextDataTime from "../Text/TextDataTime";
import TextData from "../Text/TextData";
import { EditalTipoIntevaloEnum } from "@/data/enum/EditalTipoIntevaloEnum";
import { EditalModoDisputaEnum } from "@/data/enum/EditalModoDisputaEnum";
import { EditalFormatoLanceEnum } from "@/data/enum/EditalFormatoLanceEnum ";
import { IconArrowForward } from "../icons";
import { IconFavorito } from "../icons/iconFavorito";
import { IconFavoritoFill } from "../icons/iconFavoritoFill";
import { CardLicita } from "../layout/CardLicita";
import { EditalStatusEnum } from "@/data/enum/EditalStatusEnum";
type ListaEditalItemProps = {
  edital?: Edital;
} & PropsWithChildren;
export default function ListaEditalItem(props: ListaEditalItemProps) {
  const { edital, children } = props;
  const [expand, setExpand] = useState(false);
  const [informacaoVisivel, setInformacaoVisivel] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const clickVerMais = () => {
    setExpand((state) => !state);
  };

  const clickFavorito = () => {
    setFavorito((state) => !state);
  };
  const Icon = favorito ? IconFavoritoFill : IconFavorito;

  const clickMaisDetalhes = () => {
    if (!informacaoVisivel) {
      setExpand(true);
    }
    setInformacaoVisivel((state) => !state);
    setExpand(!informacaoVisivel);
  };
  const textButton = expand ? "Ler -" : "Ler +";
  const textButtonInformacao = informacaoVisivel
    ? "Menos Detalhes"
    : "Mais Detalhes";
  const rotacaoIcon = informacaoVisivel ? "rotate(270deg)" : "rotate(90deg)";
  const basis = "180px";
  return (
    <CardLicita
      as="article"
      position="relative"
      borderRadius="6px"
      border="1px solid"
      borderColor="light.4"
      padding="2rem 2rem 1rem 2rem"
      direction="column"
      gap="0.5rem"
      basis="150px"
      label="Pregão eletrônico"
      w="100%"
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Heading fontSize="20px" fontWeight="700" textTransform="uppercase">
            {edital?.nomeEntidade}
          </Heading>
          <Text fontSize="14px" fontWeight="500" textTransform="uppercase">
            {edital?.cidadeEntidade} - {edital?.estadoEntidade}
          </Text>
        </Box>
        <Flex gap="1rem" alignItems="center">
          <Tag>{EditalStatusEnum.toString(edital?.status ?? 0)}</Tag>
          <IconButton
            onClick={clickFavorito}
            icon={<Icon />}
            aria-label="Favoritar"
            variant="link"
          />
        </Flex>
      </Flex>
      <Flex>
        <Text
          noOfLines={expand ? undefined : 1}
          fontFamily="inter"
          fontWeight="500"
          textAlign="justify"
          fontSize="14px"
        >
          {edital?.objetoEdital}
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
          <Button variant="link" onClick={clickVerMais} marginStart="0.5rem">
            {textButton}
          </Button>
        )}
      </Flex>

      <Flex gap="1rem">
        <LabelText label="Pregão" prefixo="Nº" flexBasis={basis}>
          {edital?.numeroPregao}
        </LabelText>
        <LabelText label="Formato" flexBasis={basis}>
          {EditalFormatoLanceEnum.toString(edital?.formatoLance!)}
        </LabelText>
        <LabelText label="Data de Publicação no Diário" flexBasis={basis}>
          <TextDataTime>{edital?.dataPublicacaoDiario}</TextDataTime>
        </LabelText>
        <LabelText label="Data limite Propostas | Início da disputa">
          <TextDataTime>{edital?.dataInicioDisputa}</TextDataTime>
        </LabelText>
      </Flex>
      <Collapse in={informacaoVisivel} animateOpacity>
        <Flex gap="1rem">
          <LabelText label="Processo" prefixo="Nº" flexBasis={basis}>
            {edital?.numeroProcesso}
          </LabelText>
          <LabelText label="Tipo de intervalo" flexBasis={basis}>
            {EditalTipoIntevaloEnum.toString(edital?.tipoIntervalo!)}
          </LabelText>
          <LabelText label="Publicação no Sistema" flexBasis={basis}>
            {edital?.dataPublicacaoPlataforma}
          </LabelText>
          <LabelText label="Data limite Impulgnação" flexBasis={basis}>
            <TextData>{edital?.dataLimiteImpugnacao}</TextData>
          </LabelText>
        </Flex>
        <Flex gap="1rem">
          <LabelText label="Dotação" prefixo="Nº" flexBasis={basis}>
            {edital?.numeroDotacaoOrcamentaria}
          </LabelText>
          <LabelText label="Modo de disputa" flexBasis={basis}>
            {EditalModoDisputaEnum.toString(edital?.modoDisputa!)}
          </LabelText>
        </Flex>

        <Flex wrap="wrap" gap="0.5rem" mb="0.5rem">
          {edital?.segmentos.map((s) => (
            <Tag variant="outline" key={s.id}>
              {s.atividadeEconomica}
            </Tag>
          ))}
        </Flex>
      </Collapse>
      <Flex justifyContent="space-between">
        <Button
          variant="link"
          rightIcon={<IconArrowForward transform={rotacaoIcon} />}
          onClick={clickMaisDetalhes}
        >
          {textButtonInformacao}
        </Button>
        {children}
      </Flex>
    </CardLicita>
  );
}
