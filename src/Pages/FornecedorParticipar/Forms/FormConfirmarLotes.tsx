import TextMoney from "@/Components/Text/TextMoney";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import useFormConfirmarLotes, {
  FormConfirmarLotesProps,
} from "./useFormConfirmaLotes";

export default function FormConfirmarLotes(props: FormConfirmarLotesProps) {
  const { lotes, onClick, onChangeCheckeBox } = useFormConfirmarLotes(props);
  const { lote } = props;
  return (
    <>
      <Accordion allowToggle>
        {Object.keys(lotes).map((l) => (
          <AccordionItem key={l}>
            <h2>
              <AccordionButton>
                <Checkbox value={l} onChange={onChangeCheckeBox} />
                <Box as="span" flex="1" textAlign="left">
                  Lote {l}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table>
                <Thead>
                  <Tr>
                    {lote?.tipoItens == 1 && (
                      <>
                        <Th>Marca</Th>
                        <Th>Fabricante</Th>
                        <Th>ModeloVersao</Th>
                      </>
                    )}
                    <Th>Descricao</Th>
                    <Th>Unitário Proposto</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {lotes[l].map((item) => (
                    <Tr key={item.itemId}>
                      {lote?.tipoItens == 1 && (
                        <>
                          <Td>{item.marca}</Td>
                          <Td>{item.fabricante}</Td>
                          <Td>{item.modeloVersao}</Td>
                        </>
                      )}
                      <Td>{item.descricao}</Td>
                      <Td>
                        <TextMoney>{item.valor}</TextMoney>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={onClick}>Confirmar</Button>
    </>
  );
}
