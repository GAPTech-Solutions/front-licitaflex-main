import { IconOrder } from "@/Components/icons";
import { Flex, Input, Select, Text } from "@chakra-ui/react";

export default function CardTop() {
  return (
    <Flex
      paddingInline="1rem"
      marginBottom="1rem"
      justifyContent="space-between"
    >
      <Input placeholder="Palavra-chave" variant="outline" maxWidth="300px" />
      <Flex alignItems="center" justifyContent="flex-end" gap="1rem">
        <Flex alignItems="center" gap="0.5rem">
          <IconOrder />
          <Text as="span" width="90px">
            Ordenar por
          </Text>
        </Flex>
        <Select variant="outline">
          <option>Número de Intervalos</option>
        </Select>
      </Flex>
    </Flex>
  );
}
