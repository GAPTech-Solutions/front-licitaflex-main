import ButtonSteps from "@/Components/buttons/ButtonSteps";
import { IconArrowBack } from "@/Components/icons";
import InputSegmentos from "@/Components/input/InputSegmentos";
import Visivel from "@/Components/Visivel/Visivel";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import useFormDadosGerais from "./useFormDadosGerais";
export default function FormDadosGerais() {
  const {
    formState: { errors },
    register,
    submit,
    adicionarSegmentos,
    prevStep,
    segmentos,
    tipoIntervalo,
    isLoading,
    dataWizard,
  } = useFormDadosGerais();
  return (
    <form onSubmit={submit}>
      <Stack spacing={4}>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.numeroProcesso}>
            <FormLabel>Nº do Processo</FormLabel>
            <Input
              {...register("numeroProcesso", {
                required: "O campo é obrigatório",
              })}
            />
            <FormErrorMessage>
              {errors.numeroProcesso?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.numeroPregao}>
            <FormLabel>Nº Pregão</FormLabel>
            <Input
              {...register("numeroPregao", {
                required: "O campo é obrigatório",
              })}
            />
            <FormErrorMessage>{errors.numeroPregao?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.numeroDotacaoOrcamentaria}>
            <FormLabel>Nº Dotação Orçamentária</FormLabel>
            <Input
              {...register("numeroDotacaoOrcamentaria", {
                required: "O campo é obrigatório",
              })}
            />
            <FormErrorMessage>
              {errors.numeroDotacaoOrcamentaria?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.tipoIntervalo}>
            <FormLabel>Tipo de intervalo</FormLabel>
            <Select
              {...register("tipoIntervalo", {
                required: "O campo é obrigatório",
              })}
            >
              <option value="">Selecione tipo</option>
              <option value={1}>Menor Preço</option>
              <option value={3}>Maior Preço</option>
              <option value={2}>Maior Desconto</option>
            </Select>
            <Visivel show={tipoIntervalo == 1}>
              <Switch {...register("tipoTaxa", {})}>Lance tipo Taxa?</Switch>
            </Visivel>
            <FormErrorMessage>{errors.tipoIntervalo?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.modoDisputa}>
            <FormLabel>Modo de disputa</FormLabel>
            <Select
              {...register("modoDisputa", {
                required: "O campo é obrigatório",
              })}
            >
              <option value="">Selecione o modo de disputa</option>
              <option value={1}>Aberto</option>
              <option value={2}>Aberto e Fechado</option>
            </Select>
            <FormErrorMessage>{errors.modoDisputa?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.formatoLance}>
            <FormLabel>Formato do Lance</FormLabel>
            <Select
              {...register("formatoLance", {
                required: "O campo é obrigatório",
              })}
            >
              <option value="">Selecione o formato</option>
              <option value={1}>Unitário</option>
              <option value={2}>Global</option>
            </Select>
            <FormErrorMessage>{errors.formatoLance?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.numeroCasasDecimaisLance}>
            <FormLabel>Decimais dos Preços</FormLabel>
            <Select
              {...register("numeroCasasDecimaisLance", {
                required: "O campo é obrigatório",
              })}
            >
              <option value="">Selecione o formato</option>
              <option value={2}>2 Casas</option>
              <option value={3}>3 Casas</option>
              <option value={4}>4 Casas</option>
            </Select>
            <FormErrorMessage>
              {errors.numeroCasasDecimaisLance?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.dataPublicacaoDiario}>
            <FormLabel>Data da publicação no Diário</FormLabel>
            <Input
              type="datetime-local"
              {...register("dataPublicacaoDiario", {
                required: "O campo é obrigatório",
              })}
            />
            <FormErrorMessage>
              {errors.dataPublicacaoDiario?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.dataLimiteImpugnacao}>
            <FormLabel>Data Limite para Impugnação</FormLabel>
            <Input
              type="datetime-local"
              {...register("dataLimiteImpugnacao", {
                required: "O campo é obrigatório",
              })}
            />
            <FormErrorMessage>
              {errors.dataLimiteImpugnacao?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.dataInicioDisputa}>
            <FormLabel>Início da Disputa</FormLabel>
            <Input
              type="datetime-local"
              {...register("dataInicioDisputa", {
                required: "O campo é obrigatório",
              })}
            />
            <FormErrorMessage>
              {errors.dataInicioDisputa?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.ordemFase}>
            <FormLabel>Ordem das Fases</FormLabel>
            <Select
              {...register("ordemFase", {
                required: "O campo é obrigatório",
              })}
            >
              <option value="">Selecione a ordem</option>
              <option value={1}>
                Classificação &gt; Disputa &gt; Habilitação
              </option>
              <option value={1}>
                Habilitação &gt; Disputa &gt; Classificação
              </option>
            </Select>
            <FormErrorMessage>{errors.ordemFase?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl>
            <FormLabel>Segmentos</FormLabel>
            <InputSegmentos onChange={adicionarSegmentos} values={segmentos} />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isInvalid={!!errors.objetoEdital}>
            <FormLabel>Objeto do Edital</FormLabel>
            <Textarea
              rows={8}
              {...register("objetoEdital", {
                required: "O campo é obrigatório",
              })}
            ></Textarea>
            <FormErrorMessage>{errors.objetoEdital?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex justifyContent="space-between">
          <ButtonSteps
            type="button"
            rightIcon={undefined}
            leftIcon={<IconArrowBack />}
            onClick={prevStep}
          >
            Voltar
          </ButtonSteps>

          <ButtonSteps type="submit" isLoading={isLoading} />
        </Flex>
      </Stack>
    </form>
  );
}
