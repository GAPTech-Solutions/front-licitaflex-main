import { IconTrash } from "@/Components/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Progress,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useFormDocumentos from "./useFormDocumentos";

export default function FormDocumentos() {
  const { onChange, onSave, progress, documentos, inputRef, isLoading } =
    useFormDocumentos();
  return (
    <Flex>
      <Flex flex="2" direction="column">
        <Heading>Lista de documentos</Heading>
        <Input type="file" onChange={onChange} multiple ref={inputRef} />
        <Progress value={progress} mt="0.5rem" />

        <Table>
          <Thead>
            <Tr>
              <Th>Arquivo</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {documentos.map((d) => (
              <Tr key={d.arquivo}>
                <Th>
                  <Link href={d.link} target="_blank">
                    {d.nomeArquivo}
                  </Link>
                </Th>
                <Th>
                  <IconButton icon={<IconTrash />} aria-label="Excluir" />
                </Th>
              </Tr>
            ))}
            <Tr>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
      <Flex flex="1" direction="column" gap="1rem">
        <Flex direction="column" gap="0.5rem">
          <Heading>Documentos</Heading>
          <Text>
            A relação detalhada dos documentos obrigatórios deve ser verificada
            no edital. Não se esqueça que toda a documentação exigida deve ser
            enviada neste momento sob pena de inabilitação.
          </Text>
        </Flex>
        <Button
          disabled={documentos.length === 0}
          isLoading={isLoading}
          onClick={onSave}
        >
          Finalizar e Enviar
        </Button>
      </Flex>
    </Flex>
  );
}
