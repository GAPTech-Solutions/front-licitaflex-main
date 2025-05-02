import ButtonSteps from "@/Components/buttons/ButtonSteps";
import { IconArrowBack } from "@/Components/icons";
import Visivel from "@/Components/Visivel/Visivel";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react";
import useFormRegistroPreco from "./useFormRegistroPreco";
export default function FormRegistroPreco() {
  const {
    formState: { errors },
    registroPreco,
    register,
    submit,
    prevStep,
  } = useFormRegistroPreco();
  return (
    <form onSubmit={submit}>
      <Stack spacing={4}>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.registroPreco}>
            <FormLabel position="initial">É registro de Preços</FormLabel>
            <Switch {...register("registroPreco")} />
          </FormControl>
          <Visivel show={registroPreco}>
            <FormControl isInvalid={!!errors.prazoValidade}>
              <FormLabel>Prazo de validade</FormLabel>
              <Select
                {...register("prazoValidade", {
                  disabled: !registroPreco,
                  required: "O prazo de validade é obrigatório",
                })}
              >
                <option value="">Selecione o prazo de validade</option>
                <option value={6}>6 Meses</option>
                <option value={12}>12 Meses</option>
              </Select>
              <FormErrorMessage>
                {errors.prazoValidade?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.permitidoCarona}>
              <Switch
                {...register("permitidoCarona", {
                  disabled: !registroPreco,
                })}
              >
                É permitido Carona?
              </Switch>
            </FormControl>
          </Visivel>
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
          <ButtonSteps type="submit" />
        </Flex>
      </Stack>
    </form>
  );
}
