import { Segmento } from "@/data/types/Segmento";
import {
  Flex,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import MultiSelectList from "./MultiSelectList";
import { InputContainerCss } from "./style";
import useInputSegmentos, { InputSegmentosProps } from "./useInputSegmentos";

export default function InputSegmentos(props: InputSegmentosProps) {
  const {
    buscaSegmentos,
    focus,
    select,
    itemSelecionado,
    remover,
    preview,
    display,
    inputRef,
    segmentosSelecionados,
  } = useInputSegmentos(props);
  return (
    <InputContainerCss>
      <Flex ref={inputRef} alignItems="flex-start">
        <Input onChange={buscaSegmentos} onFocus={focus} maxW="200px" />
        <HStack flexWrap="wrap">
          {segmentosSelecionados.map((s) => (
            <Tag key={s.id} size="md" variant="outline" colorScheme="green">
              <TagLabel>{s.atividadeEconomica}</TagLabel>
              <TagCloseButton onClick={() => remover(s)} />
            </Tag>
          ))}
        </HStack>
      </Flex>
      <MultiSelectList
        getLabel={(e: Segmento) => e.atividadeEconomica}
        items={preview}
        isItemSelected={itemSelecionado}
        onClickList={select}
        textNoItemToSelect="Nenhum"
        display={display}
      />
    </InputContainerCss>
  );
}
