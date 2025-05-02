import ButtonSteps from "@/Components/buttons/ButtonSteps";
import { IconArrowBack } from "@/Components/icons";
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
} from "@chakra-ui/react";
import useFormOrigemRecursos from "./useFormOrigemRecursos";
export default function FormOrigemRecursos() {
  const {
    formState: { errors },
    convenio,
    register,
    submit,
    prevStep,
  } = useFormOrigemRecursos();
  return (
    <form onSubmit={submit}>
      <Stack spacing={4}>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.convenio}>
            <FormLabel position="initial">É convênio/transferência</FormLabel>
            <Switch {...register("convenio")} />
          </FormControl>
          <Visivel show={convenio}>
            <FormControl isInvalid={!!errors.origemRecurso}>
              <FormLabel>Origem Recursos</FormLabel>
              <Select
                {...register("origemRecurso", {
                  disabled: !convenio,
                  required: "A origem do recurso é obrigatório",
                })}
              >
                <option value="">Selecione a Autoridade</option>
                <option value={1}>Nacional</option>
                <option value={1}>Internacional</option>
              </Select>
              <FormErrorMessage>
                {errors.origemRecurso?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.convenioRecurso}>
              <FormLabel>Nº do Convenio</FormLabel>
              <Input
                {...register("convenioRecurso", {
                  disabled: !convenio,
                  required: "O número do convenio é obrigatório",
                })}
              />
              <FormErrorMessage>
                {errors.convenioRecurso?.message}
              </FormErrorMessage>
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
