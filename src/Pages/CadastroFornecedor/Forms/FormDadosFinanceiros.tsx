import ButtonDelete from "@/Components/buttons/ButtonDelete";
import { IconArrowForward, IconPlus } from "@/Components/icons";
import ModalContent from "@/Components/Modal/Conteudo/ModalContent";
import { DadosFinanceiroDto } from "@/data/dto/dados.financeiro";
import { TipoContaBancariaEnum } from "@/data/enum/TipoContaBancariaEnum";
import Banco from "@/data/types/Banco";
import {
  Button,
  Flex,
  FormControl,
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
import { UseFormRegister } from "react-hook-form";
import useFormDadosFinanceiros from "./useFormDadosFinanceiros";

export default function FormDadosFinanceiros() {
  const {
    dadosFinanceiros,
    propsModal,
    adicionarConta,
    deleteConta,
    proximaClick,
  } = useFormDadosFinanceiros();
  return (
    <>
      <ModalContent {...propsModal} />
      <Table>
        <Thead>
          <Tr>
            <Th>Banco</Th>
            <Th>Agência</Th>
            <Th>Conta</Th>
            <Th>Tipo Conta</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {dadosFinanceiros.map((d) => (
            <Tr key={d.id}>
              <Td>{d.banco.nome}</Td>
              <Td>{d.agencia}</Td>
              <Td>{d.numeroConta}</Td>
              <Td>{TipoContaBancariaEnum.toString(d.tipoConta)}</Td>
              <Td>
                <ButtonDelete
                  aria-label="Excluir dado bancário"
                  {...deleteConta(d)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        alignSelf="flex-start"
        onClick={adicionarConta}
        colorScheme="azul"
        variant="outline"
        leftIcon={<IconPlus />}
      >
        Cadastrar Conta
      </Button>
      <Button
        type="button"
        alignSelf="flex-end"
        colorScheme="azul"
        rightIcon={<IconArrowForward />}
        paddingY="0.25rem"
        height="12"
        mt="2rem"
        onClick={proximaClick}
      >
        PRÓXIMA ETAPA
      </Button>
    </>
  );
}

type FormDadosFinanceiroModalProps = {
  submit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  bancos: Banco[];
  register: UseFormRegister<DadosFinanceiroDto>;
  isLoading: boolean;
  close?: () => void;
};
export function FormDadosFinanceiroModal(props: FormDadosFinanceiroModalProps) {
  const { submit, bancos, register, isLoading, close } = props;

  return (
    <Stack as="form" spacing={4} onSubmit={submit}>
      <Flex>
        <FormControl>
          <FormLabel>Banco</FormLabel>
          <Select {...register("codigoBanco")}>
            <option>Banco</option>
            {bancos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>
      <Flex gap="1rem">
        <FormControl>
          <FormLabel>Tipo Conta</FormLabel>
          <Select {...register("tipoConta")}>
            <option value="1">Conta Corrente</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Agência</FormLabel>
          <Input
            placeholder="Agência"
            {...register("agencia", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Conta</FormLabel>
          <Input
            placeholder="Conta"
            {...register("conta", { required: true })}
          />
        </FormControl>
      </Flex>
      <Flex justifyContent="space-between" gap="1rem">
        <Button type="button" onClick={close} isLoading={isLoading} flex="1">
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading} flex="1" colorScheme="azul">
          Confirmar
        </Button>
      </Flex>
    </Stack>
  );
}
