import {
  IconArrowBack,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@/Components/icons";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useFormLotes from "./useFormLotes";
import ModalContent from "@/Components/Modal/Conteudo/ModalContent";
import ButtonSteps from "@/Components/buttons/ButtonSteps";
import TextMoney from "@/Components/Text/TextMoney";

export default function FormLotes() {
  const {
    adicionarLote,
    editarLote,
    excluirLote,
    prevStep,
    salvarRascunho,
    isLoadingRascunho,
    publicarLicitacao,
    propsModal,
    lotes,
  } = useFormLotes();
  return (
    <>
      <ModalContent {...propsModal} />
      <Stack spacing={4}>
        <Accordion>
          {lotes?.map((lote) => (
            <AccordionItem key={lote.id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Lote {lote.sequencia}
                  </Box>
                  <ButtonGroup isAttached variant="ghost">
                    <IconButton
                      as="a"
                      icon={<IconEdit />}
                      aria-label="Editar lote"
                      onClick={() => editarLote(lote)}
                    />
                    <IconButton
                      as="a"
                      icon={<IconTrash />}
                      aria-label="Excluir lote"
                      onClick={() => excluirLote(lote)}
                    />
                  </ButtonGroup>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th>Descrição</Th>
                      <Th>Quantidade</Th>
                      <Th>Unidade</Th>
                      <Th>Unitário</Th>
                      <Th>Total</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {lote.items.map((item, i) => (
                      <Tr key={i}>
                        <Td>{item.sequencia}</Td>
                        <Td>{item.descricao}</Td>
                        <Td>{item.quantidade}</Td>
                        <Td>{item.unidadeMedida}</Td>
                        <Td>
                          <TextMoney>{item.valorUnitario}</TextMoney>
                        </Td>
                        <Td>
                          <TextMoney>{item.valorTotal}</TextMoney>
                        </Td>
                        <Td></Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <ButtonSteps
          type="button"
          alignSelf="flex-start"
          leftIcon={<IconPlus />}
          rightIcon={undefined}
          onClick={adicionarLote}
          variant="outline"
        >
          Adicionar Lote
        </ButtonSteps>
        <Flex justifyContent="space-between">
          <ButtonSteps
            type="button"
            rightIcon={undefined}
            leftIcon={<IconArrowBack />}
            onClick={prevStep}
          >
            Voltar
          </ButtonSteps>
          <ButtonGroup>
            <ButtonSteps
              type="button"
              rightIcon={undefined}
              onClick={salvarRascunho}
              isLoading={isLoadingRascunho}
              variant="outline"
            >
              Salvar Rascunho
            </ButtonSteps>
            <ButtonSteps onClick={publicarLicitacao}>Publicar</ButtonSteps>
          </ButtonGroup>
        </Flex>
      </Stack>
    </>
  );
}
