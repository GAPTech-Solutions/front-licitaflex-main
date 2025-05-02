import { IconTrash } from "@/Components/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useFormRegioes from "./useFormEntidadeRegioes";

export default function FormEntidadeRegioes() {
  const {
    register,
    formState: { errors },
    regiao,
    cidades,
    isLoading,
    estados,
    submit,
    enviarAvaliacao,
    isLoadingEnviarAvaliacao,
  } = useFormRegioes();

  return (
    <>
      <Stack as="form" spacing={4} onSubmit={submit}>
        <Flex gap="1rem">
          <FormControl width="10%" isInvalid={!!errors.estado}>
            <FormLabel>Estado</FormLabel>
            <Select
              size="lg"
              {...register("estado", {
                required: { value: true, message: "Selecione um estado" },
              })}
            >
              <option value="">Estado</option>
              {estados.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isInvalid={!!errors.regiao}>
            <FormLabel>Cidades</FormLabel>
            <Select
              size="lg"
              {...register("regiao", {
                required: { value: true, message: "Selecione um estado" },
              })}
            >
              <option value="">Selecione a cidade</option>
              {cidades.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
        <Button type="submit" isLoading={isLoading}>
          Adicionar
        </Button>
      </Stack>
      <Table>
        <Thead>
          <Tr>
            <Th>Cidade</Th>
            <Th>Estado</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {regiao.map((r) => (
            <Tr key={r.id}>
              <Td>{r.nome}</Td>
              <Td>{r.estado}</Td>
              <Td>
                <IconButton
                  icon={<IconTrash />}
                  aria-label="Excluir dado bancário"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        type="button"
        isLoading={isLoadingEnviarAvaliacao}
        onClick={enviarAvaliacao}
      >
        Enviar avaliação
      </Button>
    </>
  );
}
