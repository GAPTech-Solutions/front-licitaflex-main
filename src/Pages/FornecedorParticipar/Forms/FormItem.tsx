import { InputMonetario } from "@/Components/input/InputMonetario";
import TextMoney from "@/Components/Text/TextMoney";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  Text,
  Divider,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import useFormItem, { FormItemProps } from "./useFormItem";
import LabelText from "@/Components/Text/LabelText";
import { useState } from "react";

export default function FormItem(props: FormItemProps) {
  const {
    sequencia,
    lote,
    items,
    register,
    validarValorProposto,
    validarDescricao,
  } = useFormItem(props);
  const errors = props.formState.errors;
  const [show, setShow] = useState(false);
  return (
    <>
      {items.map((item, i) => (
        <Flex key={item.id} direction="column">
          {!show && (
            <Button
              variant="link"
              alignSelf="flex-start"
              onClick={() => setShow(true)}
            >
              Ver items
            </Button>
          )}
          {show && (
            <Flex direction="column">
              <Text>Item {item.sequencia}</Text>
              <Divider />
              <Text mt="1rem">{item.descricao}</Text>
              <Flex gap="1rem">
                <LabelText label="Quantidade" prefixo="">
                  {item.quantidade}
                </LabelText>
                <LabelText label="Valor Unitário">
                  <TextMoney>{item.valorUnitario}</TextMoney>
                </LabelText>
              </Flex>
              <Flex direction="column" gap="1rem" mt="1rem">
                <Flex gap="1rem">
                  <FormControl
                    maxW="25%"
                    isInvalid={!!errors?.[sequencia]?.lotes?.[i]?.valor}
                  >
                    <FormLabel>Valor Proposto</FormLabel>
                    <InputMonetario
                      {...register(`${sequencia}.lotes.${i}.valor`, {
                        setValueAs(value) {
                          return Number.parseString(value, { safe: true });
                        },
                        validate: (value) => validarValorProposto(value, i),
                      })}
                    />
                    <FormErrorMessage>
                      {errors?.[sequencia]?.lotes?.[i]?.valor?.message}
                    </FormErrorMessage>
                  </FormControl>
                  {lote.tipoItens == 1 && (
                    <>
                      <FormControl>
                        <FormLabel>Marca</FormLabel>
                        <Input
                          {...register(`${sequencia}.lotes.${i}.marca`)}
                          readOnly={!lote.marcaFabricante}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Fabricante</FormLabel>
                        <Input
                          {...register(`${sequencia}.lotes.${i}.fabricante`)}
                          readOnly={!lote.marcaFabricante}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Modelo/Versão</FormLabel>
                        <Input
                          {...register(
                            `${sequencia}.lotes.${i}.modeloVersao`,
                            {}
                          )}
                          readOnly={!lote.marcaFabricante}
                        />
                      </FormControl>
                    </>
                  )}
                </Flex>
                <Flex>
                  <FormControl
                    isInvalid={!!errors?.[sequencia]?.lotes?.[i]?.descricao}
                  >
                    <FormLabel>Descrição</FormLabel>
                    <Textarea
                      {...register(`${sequencia}.lotes.${i}.descricao`, {
                        validate: (value, form) =>
                          validarDescricao(value, i, form),
                      })}
                    />
                    <FormErrorMessage>
                      {errors?.[sequencia]?.lotes?.[i]?.descricao?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Flex>
            </Flex>
          )}
          {show && (
            <Button
              variant="link"
              alignSelf="flex-start"
              onClick={() => setShow(false)}
              pt="0.5rem"
            >
              Ver menos
            </Button>
          )}
        </Flex>
      ))}
    </>
  );
}
