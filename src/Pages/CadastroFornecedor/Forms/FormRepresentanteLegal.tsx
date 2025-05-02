import ButtonDelete from "@/Components/buttons/ButtonDelete";
import ButtonSteps from "@/Components/buttons/ButtonSteps";
import { IconPlus } from "@/Components/icons";
import InputMask from "@/Components/input-mask/InputMask";
import ModalContent from "@/Components/Modal/Conteudo/ModalContent";
import { TipoRepresentanteFornecedorEnum } from "@/data/enum/TipoRepresentanteFornecedorEnum";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import useFormRepresentante, {
  FormRepresentanteModalProps,
  useFormRepresentanteModal,
} from "./useFormRepresentante";

export default function FormRepresentanteLegal() {
  const {
    representantes,
    propsModal,
    adicionarRepresentanteModal,
    proximaClick,
    deleteRepresentante,
  } = useFormRepresentante();
  return (
    <>
      <ModalContent {...propsModal} />
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Cargo</Th>
            <Th>Tipo</Th>
            <Th>RG</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {representantes.map((d) => (
            <Tr key={d.id}>
              <Td>{d.nome}</Td>
              <Td>{d.cargo}</Td>
              <Td>
                {TipoRepresentanteFornecedorEnum.toString(d.tipoRepresentante)}
              </Td>
              <Td>{d.registroGeral}</Td>
              <Td>
                <ButtonDelete
                  aria-label="Excluir representante"
                  {...deleteRepresentante(d)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        alignSelf="flex-start"
        onClick={adicionarRepresentanteModal}
        colorScheme="azul"
        variant="outline"
        leftIcon={<IconPlus />}
      >
        Cadastrar Representante
      </Button>
      <ButtonSteps onClick={proximaClick} />
    </>
  );
}

export function FormDadosRepresentanteModal(
  props: FormRepresentanteModalProps
) {
  const {
    submit,
    register,
    isLoading,
    close,
    blurCPF,
    isDisabled,
    formState: { errors },
  } = useFormRepresentanteModal(props);

  return (
    <Stack as="form" spacing={4} onSubmit={submit}>
      <Flex gap="1rem">
        <FormControl isInvalid={!!errors.root || !!errors.usuarioId}>
          <FormLabel>CPF</FormLabel>
          <InputMask mask="###.###.###-##" onChange={blurCPF} />
          <FormErrorMessage>
            {errors.root?.message || errors.usuarioId?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isDisabled={isDisabled}
          isInvalid={!!errors.tipoRepresentante}
        >
          <FormLabel>Tipo Representante</FormLabel>
          <Select
            {...register("tipoRepresentante", {
              required: "Campo obrigatório",
            })}
          >
            <option value="">Selecione</option>
            <option value={1}>Administrador</option>
            <option value={2}>Procurador</option>
            <option value={3}>Representante</option>
          </Select>
          <FormErrorMessage>
            {errors.tipoRepresentante?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex gap="1rem">
        <FormControl isDisabled={isDisabled} isInvalid={!!errors.cargo}>
          <FormLabel>Cargo</FormLabel>
          <Input
            placeholder="Cargo"
            {...register("cargo", { required: "Campo obrigatório" })}
          />
          <FormErrorMessage>{errors.cargo?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isDisabled={isDisabled} isInvalid={!!errors.registroGeral}>
          <FormLabel>Registro Geral</FormLabel>
          <Input
            placeholder="Registro Geral"
            {...register("registroGeral", { required: "Campo obrigatório" })}
          />
          <FormErrorMessage>{errors.registroGeral?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex justifyContent="space-between" gap="1rem">
        <Button
          type="button"
          onClick={() => close()}
          isLoading={isLoading}
          flex="1"
        >
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading} flex="1" colorScheme="azul">
          Confirmar
        </Button>
      </Flex>
    </Stack>
  );
}
