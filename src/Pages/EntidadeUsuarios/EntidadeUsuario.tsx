import { IconTrash } from "@/Components/icons";
import InputMask from "@/Components/input-mask/InputMask";
import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import { TipoUsuarioEntidadePublicaEnum } from "@/data/enum/TipoUsuarioEntidadePublicaEnum";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
import useEntidadeUsuario from "./useEntidadeUsuario";

export default function EntidadeUsuario() {
  const {
    isLoading,
    usuarios,
    formState: { errors },
    validateCPFAsync,
    register,
    submit,
  } = useEntidadeUsuario();
  return (
    <SuspenseLicita isLoading={isLoading}>
      <Stack spacing={4} padding="2rem">
        <form onSubmit={submit}>
          <Flex gap="1rem">
            <FormControl isInvalid={!!errors.cpfUsuario}>
              <FormLabel>CPF</FormLabel>
              <InputMask
                mask="###.###.###-##"
                {...register("cpfUsuario", {
                  required: "Selecione a modalidade",
                  validate: validateCPFAsync,
                })}
                size="lg"
              />
              <FormErrorMessage>{errors.cpfUsuario?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.tipoUsuarioEntidade}>
              <FormLabel>Tipo Usuário</FormLabel>
              <Select
                {...register("tipoUsuarioEntidade", {
                  required: "Selecione o tipo de usuário",
                })}
                size="lg"
              >
                <option value="">Selecione o Tipo</option>
                <option value={1}>Autoridade Superior</option>
                <option value={2}>Pregoeiro</option>
                <option value={3}>Equipe de Apoio</option>
              </Select>
              <FormErrorMessage>
                {errors.tipoUsuarioEntidade?.message}
              </FormErrorMessage>
            </FormControl>
            <Flex alignItems="end">
              <Button type="submit" isLoading={isLoading}>
                Adicionar
              </Button>
            </Flex>
          </Flex>
        </form>
        <Table>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Tipo de Usuário</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios?.map((u) => (
              <Tr key={u.id}>
                <Td>{u.nome}</Td>
                <Td>
                  {TipoUsuarioEntidadePublicaEnum.toString(
                    u.tipoUsuarioEntidadePublica
                  )}
                </Td>
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
      </Stack>
    </SuspenseLicita>
  );
}
