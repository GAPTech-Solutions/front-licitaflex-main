import ButtonSteps from "@/Components/buttons/ButtonSteps";
import { IconPlus, IconTrash } from "@/Components/icons";
import { InputMonetario } from "@/Components/input/InputMonetario";
import TextMoney from "@/Components/Text/TextMoney";
import Visivel from "@/Components/Visivel/Visivel";
import { Lote } from "@/data/types/Lote";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
  Switch,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useFormLote from "./useFormLote";
import { useCadastroEdital } from "../Context/CadastroEditalContext";
import { InputPercentagem } from "@/Components/input/InputPercentagem";

export type FormLoteProps = {
  lote?: Lote;
  formatoLance: number;
  editalId: string;
  close?: () => void;
};
export default function FormLote(props: FormLoteProps) {
  const {
    register,
    formState: { errors },
    items,
    submit,
    adicionarItem,
    removerItem,
    totalItem,
    loteUnitario,
  } = useFormLote(props);

  const { edital } = useCadastroEdital();
  return (
    <form onSubmit={submit}>
      <Stack spacing={4}>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.tipoItens}>
            <FormLabel>Tipo de Itens</FormLabel>
            <Select {...register("tipoItens", { required: true })}>
              <option value="">Selecione o tipo</option>
              <option value={1}>Produtos</option>
              <option value={2}>Serviço</option>
            </Select>
            <FormErrorMessage>{errors.tipoItens?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel position="initial">Requer Marca e Fabricante</FormLabel>
            <Switch {...register("marcaFabricante")} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel position="initial">
              Requer documentos na proposta
            </FormLabel>
            <Switch {...register("documentosProposta")} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel position="initial">
              Não permitir alterar a descrição
            </FormLabel>
            <Switch {...register("alterarDescricao")} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.descricaoLote}>
            <FormLabel>Descrição do lote</FormLabel>
            <Textarea {...register("descricaoLote", { required: true })} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.intervaloLance}>
            <FormLabel>Valor entre Lances</FormLabel>
            {edital?.tipoTaxa ? (
              <InputPercentagem
                {...register("intervaloLance", {
                  required: true,
                  setValueAs(value) {
                    return Number.parseString(value, { safe: true });
                  },
                })}
              />
            ) : (
              <InputMonetario
                {...register("intervaloLance", {
                  required: true,
                  setValueAs(value) {
                    return Number.parseString(value, { safe: true });
                  },
                })}
              />
            )}
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.tipoBeneficio}>
            <FormLabel>Tipo Beneficio</FormLabel>
            <Select {...register("tipoBeneficio", { required: true })}>
              <option value={0}>Sem benefício</option>
              <option value={1}>ME/EPP</option>
              <option value={2}>Regional</option>
            </Select>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel position="initial">Valor Sigiloso</FormLabel>
            <Switch {...register("sigilioso")} />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex
          direction="column"
          padding="1rem"
          gap="1rem"
          border="1px solid var(--licita-flex-colors-chakra-border-color)"
          borderRadius="var(--licita-flex-radii-md)"
        >
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
              {items.map((v, index) => (
                <Tr key={index}>
                  <Td>{v.sequencia}</Td>
                  <Td>
                    <FormControl isInvalid={!!errors.items?.[index]?.descricao}>
                      <Input
                        variant="outline"
                        {...register(`items.${index}.descricao`, {
                          required: true,
                        })}
                      />
                    </FormControl>
                  </Td>
                  <Td>
                    <FormControl
                      isInvalid={!!errors.items?.[index]?.quantidade}
                    >
                      <Input
                        variant="outline"
                        {...register(`items.${index}.quantidade`, {
                          required: true,
                        })}
                      />
                    </FormControl>
                  </Td>
                  <Td>
                    <FormControl
                      isInvalid={!!errors.items?.[index]?.unidadeMedida}
                    >
                      <Input
                        variant="outline"
                        {...register(`items.${index}.unidadeMedida`, {
                          required: true,
                        })}
                      />
                    </FormControl>
                  </Td>
                  <Td>
                    <FormControl
                      isInvalid={!!errors.items?.[index]?.valorUnitario}
                    >
                      <InputMonetario
                        variant="outline"
                        {...register(`items.${index}.valorUnitario`, {
                          required: true,
                          setValueAs(value) {
                            return Number.parseString(value, { safe: true });
                          },
                        })}
                      />
                    </FormControl>
                  </Td>
                  <Td>
                    <TextMoney>{totalItem(v)}</TextMoney>
                  </Td>
                  <Td>
                    <Visivel show={!loteUnitario && index != 0}>
                      <IconButton
                        icon={<IconTrash height="20px" width="20px" />}
                        aria-label="Excluir item"
                        onClick={() => removerItem(index)}
                        variant="ghost"
                      />
                    </Visivel>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Visivel show={!loteUnitario}>
            <ButtonSteps
              type="button"
              onClick={adicionarItem}
              alignSelf="flex-start"
              leftIcon={<IconPlus />}
              rightIcon={undefined}
              variant="outline"
            >
              Adicionar Item
            </ButtonSteps>
          </Visivel>
        </Flex>
        <ButtonSteps type="submit" colorScheme="azul" rightIcon={undefined}>
          Salvar
        </ButtonSteps>
      </Stack>
    </form>
  );
}
