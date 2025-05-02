import { Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
type ListaDocumentoProps = {
  titulo: string;
} & PropsWithChildren;
export default function ListaDocumento(props: ListaDocumentoProps) {
  const { children, titulo } = props;
  return (
    <Flex direction="column">
      <Heading textTransform="uppercase" fontSize="14px" padding="0.5rem 1rem">
        {titulo}
      </Heading>
      <Divider />
      <VStack gap="1.5rem" padding="1rem">
        {children}
      </VStack>
    </Flex>
  );
}
