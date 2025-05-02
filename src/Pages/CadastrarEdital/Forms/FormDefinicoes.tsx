import ButtonSteps from "@/Components/buttons/ButtonSteps";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";
import useFormDefinicoes from "./useFormDefinicoes";

export default function FormDefinicoes() {
  const {
    register,
    formState: { errors },
    submit,
  } = useFormDefinicoes();
  return (
    <form onSubmit={submit}>
      <Stack spacing={4}>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.modalidade}>
            <FormLabel>Modalidade</FormLabel>
            <Select
              {...register("modalidade", {
                required: "Selecione a modalidade",
              })}
            >
              <option value="">Selecione a modalidade</option>
              <option value={1}>Pregão</option>
            </Select>
            <FormErrorMessage>{errors.modalidade?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.amparoLegal}>
            <FormLabel>Amparo Legal</FormLabel>
            <Select
              {...register("amparoLegal", {
                required: "Selecione o amparo legal",
              })}
            >
              <option value="">Selecione a lei</option>
              <option value={1}>Lei 14.133/2021, Art. 28, I</option>
            </Select>
            <FormErrorMessage>{errors.amparoLegal?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonSteps type="submit" />
      </Stack>
    </form>
  );
}
