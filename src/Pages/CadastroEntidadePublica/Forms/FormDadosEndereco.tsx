import InputMask from "@/Components/input-mask/InputMask";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import useFormDadosEndereco from "./useFormDadosEndereco";

export default function FormDadosEndereco() {
  const { register, cidades, estados, blurCep, submit, isLoading } =
    useFormDadosEndereco();
  return (
    <Stack as="form" spacing={4} onSubmit={submit}>
      <Flex gap="1rem">
        <FormControl width="30%">
          <FormLabel>CEP</FormLabel>
          <InputMask
            mask="##.###-###"
            placeholder="CEP"
            size="lg"
            {...register("cep")}
            onBlur={blurCep}
          />
        </FormControl>
        <FormControl width="60%">
          <FormLabel>Logradouro</FormLabel>
          <Input
            placeholder="Logradouro"
            size="lg"
            {...register("logradouro", { required: true })}
          />
        </FormControl>
        <FormControl width="10%">
          <FormLabel>Número</FormLabel>
          <Input
            placeholder="Número"
            size="lg"
            {...register("numero", { required: true })}
          />
        </FormControl>
      </Flex>
      <Flex gap="1rem">
        <FormControl width="30%">
          <FormLabel>Complemento</FormLabel>
          <Input
            placeholder="Complemento"
            size="lg"
            {...register("complemento", { required: false })}
          />
        </FormControl>
        <FormControl width="30%">
          <FormLabel>Bairro</FormLabel>
          <Input
            placeholder="Bairro"
            size="lg"
            {...register("bairro", { required: true })}
          />
        </FormControl>
        <FormControl width="10%">
          <FormLabel>Estado</FormLabel>
          <Select size="lg" {...register("estado")}>
            <option>Estado</option>
            {estados.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl width="30%">
          <FormLabel>Cidade</FormLabel>
          <Select size="lg" {...register("codigoIbge")}>
            <option>Cidade</option>
            {cidades.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>
      <Button type="submit" isLoading={isLoading}>
        Próximo
      </Button>
    </Stack>
  );
}
