import ModalContent from "@/Components/Modal/Conteudo/ModalContent";
import TextMoney from "@/Components/Text/TextMoney";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import FormItem from "./FormItem";
import useFormLotesItens, { FormLotesItensProps } from "./useFormLotesItens";
import { CardLicita } from "@/Components/layout/CardLicita";
import LabelText from "@/Components/Text/LabelText";
import TextDataTime from "@/Components/Text/TextDataTime";
import TextPercente from "@/Components/Text/TextPercente";
import { EditalTipoIntevaloEnum } from "@/data/enum/EditalTipoIntevaloEnum";

export default function FormLotesItens(props: FormLotesItensProps) {
  const { register, submit, lotes, valorLotes, modalProps, formState } =
    useFormLotesItens(props);
  const basis = "180px";
  return (
    <>
      <ModalContent {...modalProps} />
      <Stack as="form" spacing={4} onSubmit={submit}>
        <Flex gap="1rem" direction="column">
          {lotes?.map((lote) => (
            <CardLicita key={lote.id} label={`Lote ${lote.sequencia}`}>
              <Flex direction="column" flex="1" gap="1rem">
                <Flex gap="1rem" justify="space-between">
                  <LabelText label="Valor Estimado" prefixo="">
                    <TextMoney>{lote.valorTotal}</TextMoney>
                  </LabelText>
                  <LabelText label="Tipo de intervalo">
                    {EditalTipoIntevaloEnum.toString(
                      props.edital?.tipoIntervalo!
                    )}
                  </LabelText>
                  <LabelText label="Intervalo entre os lances">
                    {props.edital?.tipoTaxa ? (
                      <TextPercente
                        precisao={props.edital.numeroCasasDecimaisLance}
                      >
                        {lote.intervaloLance}
                      </TextPercente>
                    ) : (
                      <TextMoney
                        precisao={props.edital?.numeroCasasDecimaisLance}
                      >
                        {lote.intervaloLance}
                      </TextMoney>
                    )}
                  </LabelText>
                  <LabelText label="Quantidade de Itens">
                    {lote.items.length}
                  </LabelText>
                  <LabelText label="Valor proposto">
                    <TextMoney>{lote.valorTotal}</TextMoney>
                  </LabelText>
                </Flex>
                <Flex>
                  <Text>{lote.descricaoLote}</Text>
                </Flex>
                <Flex direction="column">
                  <FormItem
                    formState={formState}
                    items={lote.items}
                    register={register}
                    lote={lote}
                  />
                </Flex>
              </Flex>
            </CardLicita>
          ))}
        </Flex>
        <Button type="submit">Próximo</Button>
      </Stack>
    </>
  );
}
