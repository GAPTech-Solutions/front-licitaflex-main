import { IconSearch } from "@/Components/icons";
import { IconHome } from "@/Components/icons/iconHome";
import Visivel from "@/Components/Visivel/Visivel";
import {
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  FlexProps,
  Input,
  InputGroup,
  Tag,
} from "@chakra-ui/react";
import MenuFiltro from "./MenuFiltro";
import { useFiltro } from "./useFiltro";

export default function Filtro(props: FlexProps) {
  const {
    tags,
    processos,
    modalidade,
    status,
    outros,
    disputa,
    formato,
    intervalo,
    clickItemFiltro,
    removerTag,
  } = useFiltro();
  return (
    <Flex
      direction="column"
      position="sticky"
      top="0"
      backgroundColor="var(--licita-flex-colors-container-bg)"
      zIndex="1"
      paddingBottom="1rem"
    >
      <Flex {...props} borderBottom="2px solid" borderBottomColor="dark.7">
        <ButtonGroup
          isAttached
          flex="1"
          css={{ "button:last-of-type": { borderRadius: "0" } }}
        >
          <Button variant="ghost">
            <IconHome />
          </Button>
          <MenuFiltro
            itens={processos}
            onClick={clickItemFiltro}
            selecionados={tags}
          >
            Processos
          </MenuFiltro>
          <MenuFiltro
            itens={modalidade}
            onClick={clickItemFiltro}
            selecionados={tags}
          >
            Modalidade
          </MenuFiltro>
          <MenuFiltro
            itens={status}
            onClick={clickItemFiltro}
            selecionados={tags}
          >
            Status
          </MenuFiltro>
          {outros && (
            <MenuFiltro
              itens={outros}
              onClick={clickItemFiltro}
              selecionados={tags}
            >
              Outros
            </MenuFiltro>
          )}
          {disputa && (
            <MenuFiltro
              itens={disputa}
              onClick={clickItemFiltro}
              selecionados={tags}
            >
              Disputa
            </MenuFiltro>
          )}
          {formato && (
            <MenuFiltro
              itens={formato}
              onClick={clickItemFiltro}
              selecionados={tags}
            >
              Formato
            </MenuFiltro>
          )}
          {intervalo && (
            <MenuFiltro
              itens={intervalo}
              onClick={clickItemFiltro}
              selecionados={tags}
            >
              Intervalo
            </MenuFiltro>
          )}
        </ButtonGroup>
        <InputGroup>
          <Input variant="flushed" borderBottom="none" />
          <Button variant="ghost">
            <IconSearch />
          </Button>
        </InputGroup>
      </Flex>
      <Visivel show={tags.length > 0}>
        <Flex padding="1rem 2rem 0 2rem" gap="0.5rem" wrap="wrap">
          {tags.map((tag) => (
            <Tag variant="outline" key={tag}>
              {tag}
              <CloseButton size="sm" onClick={() => removerTag(tag)} />
            </Tag>
          ))}
        </Flex>
      </Visivel>
    </Flex>
  );
}
