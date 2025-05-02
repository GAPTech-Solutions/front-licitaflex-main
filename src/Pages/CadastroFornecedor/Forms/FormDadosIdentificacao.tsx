import ButtonSteps from "@/Components/buttons/ButtonSteps";
import InputMask from "@/Components/input-mask/InputMask";
import Visivel from "@/Components/Visivel/Visivel";
import validateCNPJ from "@/utils/validation/cnpj";
import validateCPF from "@/utils/validation/cpf";
import {
  Checkbox,
  Divider,
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
    tipoFornecedor,
    isento,
    submit,
    isLoading,
    id,
    paises,
  } = useFormDadosIdentificacao();
  return (
    <form onSubmit={submit}>
      <Stack spacing={4}>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.pais} isDisabled={!!id}>
            <FormLabel>Pais</FormLabel>
            <Select {...register("pais")}>
              {paises.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.nome}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isInvalid={!!errors.tipoFornecedor} isDisabled={!!id}>
            <FormLabel>Tipo</FormLabel>
            <Select {...register("tipoFornecedor")}>
              <option value="1">Pessoa Jurídica</option>
              <option value="2">Pessoa Física</option>
            </Select>
          </FormControl>
          <Visivel show={tipoFornecedor == 1 || !tipoFornecedor}>
            <FormControl isInvalid={!!errors.cnpj} isDisabled={!!id}>
              <FormLabel>CNPJ</FormLabel>
              <InputMask
                mask="##.###.###/####-##"
                placeholder="CNPJ"
                {...register("cnpj", {
                  required: {
                    value: tipoFornecedor == 1,
                    message: "CNPJ é obrigatório",
                  },
                  validate: validateCNPJ,
                })}
              />
              <FormErrorMessage>{errors.cnpj?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isDisabled={isento}
              isInvalid={!!errors.inscricaoEstadual}
            >
              <FormLabel>Inscrição Estadual</FormLabel>
              <Input
                placeholder="Inscrição estadual"
                {...register("inscricaoEstadual", {
                  required: {
                    value: tipoFornecedor == 1 && isento == false,
                    message: "Inscrição estádual é obrigatório",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.inscricaoEstadual?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl width="15%">
              {/* <Switch {...register("isento")} /> */}
              <Checkbox {...register("isento")}>ISENTO</Checkbox>
            </FormControl>
          </Visivel>
          <Visivel show={tipoFornecedor == 2}>
            <FormControl isInvalid={!!errors.cpf} isDisabled={!!id}>
              <FormLabel>CPF</FormLabel>
              <InputMask
                mask="###.###.###-##"
                placeholder="CPF"
                {...register("cpf", {
                  required: {
                    value: tipoFornecedor == 2,
                    message: "CPF é obrigatório",
                  },
                  validate: validateCPF,
                })}
              />
              <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.pisNit} isDisabled={!!id}>
              <FormLabel>PIS/NIT</FormLabel>
              <Input
                placeholder="PIS/NIT"
                {...register("pisNit", {
                  required: {
                    value: tipoFornecedor == 2,
                    message: "PIS/NIT é obrigatório",
                  },
                })}
              />
              <FormErrorMessage>{errors.pisNit?.message}</FormErrorMessage>
            </FormControl>
          </Visivel>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.razaoSocial}>
            <FormLabel>Razão Social</FormLabel>
            <Input
              placeholder="Razão Social"
              {...register("razaoSocial", { required: true })}
            />
            <FormErrorMessage>{errors.razaoSocial?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.nomeFantasia}>
            <FormLabel>Nome Fantasia</FormLabel>
            <Input
              placeholder="Nome Fantasia"
              {...register("nomeFantasia", { required: true })}
            />
            <FormErrorMessage>{errors.nomeFantasia?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Divider />
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.emailLicitacao}>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="E-mail"
              {...register("emailLicitacao", { required: true })}
            />
            <FormErrorMessage>
              {errors.emailLicitacao?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.celularLicitacao}>
            <FormLabel>Telefone</FormLabel>
            <InputMask
              mask="(##) # ####-####"
              placeholder="Telefone"
              {...register("celularLicitacao", { required: true })}
            />
            <FormErrorMessage>
              {errors.celularLicitacao?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap="1rem">
          <FormControl isInvalid={!!errors.emailFinanceiro}>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="E-mail"
              {...register("emailFinanceiro", { required: true })}
            />
            <FormErrorMessage>
              {errors.emailFinanceiro?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.celularFinanceiro}>
            <FormLabel>Telefone</FormLabel>
            <InputMask
              mask="(##) # ####-####"
              placeholder="Telefone"
              {...register("celularFinanceiro", {
                required: true,
              })}
            />
            <FormErrorMessage>
              {errors.celularFinanceiro?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonSteps type="submit" isLoading={isLoading} />
      </Stack>
    </form>
  );
}
