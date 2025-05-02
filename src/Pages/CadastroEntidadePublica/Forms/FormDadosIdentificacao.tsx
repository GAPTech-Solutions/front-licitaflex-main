import InputMask from "@/Components/input-mask/InputMask";
import validateCNPJ from "@/utils/validation/cnpj";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import useFormDadosIdentificacao from "./useFormDadosIdentificacao";

export default function FormDadosIdentificacao() {
  const {
    register,
    formState: { errors },
    submit,
    isLoading,
    id,
    naturezas,
  } = useFormDadosIdentificacao();
  return (
    <form onSubmit={submit}>
      <Stack spacing={4}>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.nome}>
            <FormLabel>Nome</FormLabel>
            <Input
              placeholder="Nome da Organização"
              {...register("nome")}
              size="lg"
            />
          </FormControl>
          <FormControl isInvalid={!!errors.naturezaJuridica}>
            <FormLabel>Tipo</FormLabel>
            <Select {...register("naturezaJuridica")} size="lg">
              <option value="">Selecione a natureza</option>
              {naturezas.map((n) => (
                <option value={n.id} key={n.id}>
                  {n.nome}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.cnpj} isDisabled={!!id}>
            <FormLabel>CNPJ</FormLabel>
            <InputMask
              mask="##.###.###/####-##"
              placeholder="CNPJ"
              size="lg"
              {...register("cnpj", {
                required: {
                  value: true,
                  message: "CNPJ é obrigatório",
                },
                validate: validateCNPJ,
              })}
            />
            <FormErrorMessage>{errors.cnpj?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Button type="submit" isLoading={isLoading}>
          Próximo
        </Button>
      </Stack>
    </form>
  );
}
