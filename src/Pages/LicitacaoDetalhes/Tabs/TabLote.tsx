import TextMoney from "@/Components/Text/TextMoney";
import { Edital } from "@/data/types/Edital";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useLicitacao } from "../contextLicitacao";

export default function TabLote() {
  const { edital: data } = useLicitacao();
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Lote</Th>
          <Th>Descrição</Th>
          <Th>Valor Ref.</Th>
          <Th>Valor Proposto</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.lotes.map((l) => (
          <Tr key={l.id}>
            <Td>{l.sequencia}</Td>
            <Td>{l.descricaoLote}</Td>
            <Td>
              <TextMoney>{l.valorTotal}</TextMoney>
            </Td>
            <Td>--</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
