import ButtonSteps from "@/Components/buttons/ButtonSteps";
import { IconArrowBack } from "@/Components/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";
import useFormEquipe from "./useFormEquipe";
export default function FormEquipe() {
  const {
    formState: { errors },
    register,
    submit,
    prevStep,
    autoridadeSuperior,
    auxiliar,
    pregoeiros,
  } = useFormEquipe();
  return (
    <form onSubmit={submit}>
      <Stack spacing={4}>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.pregoeiro}>
            <FormLabel>Pregoeiro</FormLabel>
            <Select
              {...register("pregoeiro", {
                required: "Campo é obrigatório",
              })}
            >
              <option value="">Selecione o Pregoeiro</option>
              {pregoeiros.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.nome}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.pregoeiro?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.autoridadeSuperior}>
            <FormLabel>Autoridade Superior</FormLabel>
            <Select
              {...register("autoridadeSuperior", {
                required: "Campo é obrigatório",
              })}
            >
              <option value="">Selecione a Autoridade</option>
              {autoridadeSuperior.map((a) => (
                <option value={a.id} key={a.id}>
                  {a.nome}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.autoridadeSuperior?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.equipeApoio}>
            <FormLabel>Equipe de apoio</FormLabel>
            <Select
              {...register("equipeApoio", {
                required: "Campo é obrigatório",
                validate: (value: string[]) =>
                  value.length >= 2
                    ? true
                    : "É necessário ter pelo menos 2 colaboradores para equipe de apoio",
              })}
              height="200px"
              multiple
            >
              {auxiliar.map((a) => (
                <option value={a.id} key={a.id}>
                  {a.nome}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.equipeApoio?.message}</FormErrorMessage>
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
          <ButtonSteps type="submit" />
        </Flex>
      </Stack>
    </form>
  );
}
