import InputMask from "@/Components/input-mask/InputMask";
import Logo from "@/Components/logo/Logo";
import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Highlight,
  Input,
  Text,
} from "@chakra-ui/react";
import { FiguraRegistro } from "./Components/FiguraRegistro";
import { MainCss } from "./style";
import useRegistroUsuario from "./useRegistroUsuario";

export default function RegistroUsuario() {
  const {
    register,
    isLoading,
    registroSubmit,
    formState: { errors },
  } = useRegistroUsuario();
  return (
    <MainCss>
      <Center width="100%" flexDirection="column" gap="4rem">
        <Logo width="290px" />
        <Flex
          width="100%"
          height="450px"
          padding="4rem"
          gap="4rem"
          background="container-bg"
          borderRadius="0.75rem"
        >
          <section>
            <FiguraRegistro maxW="469px" w="100%" height="auto" />
          </section>
          <Divider orientation="vertical" />
          <form method="post" onSubmit={registroSubmit}>
            <Flex direction="column" gap="0.5rem" flex="1">
              <Heading fontSize="1.5rem" mb="0.5rem">
                Cadastrar conta
              </Heading>
              <FormControl label="Nome" isInvalid={!!errors.nome}>
                <Input
                  placeholder="Nome"
                  {...register("nome", { required: true })}
                  variant="outline"
                />
              </FormControl>
              <FormControl label="E-mail" isInvalid={!!errors.email}>
                <Input
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                  variant="outline"
                />
              </FormControl>
              <Flex gap="1rem">
                <FormControl label="CPF" isInvalid={!!errors.cpf}>
                  <InputMask
                    mask="###.###.###-##"
                    placeholder="CPF"
                    {...register("cpf", { required: true })}
                    variant="outline"
                  />
                </FormControl>
                <FormControl label="Celular" isInvalid={!!errors.celular}>
                  <InputMask
                    mask="(##) # ####-####"
                    placeholder="Celular"
                    {...register("celular", { required: true })}
                    variant="outline"
                  />
                </FormControl>
              </Flex>
              <Flex gap="1rem">
                <FormControl label="Senha" isInvalid={!!errors.password}>
                  <Input
                    placeholder="Senha"
                    type="password"
                    {...register("password", { required: true })}
                    variant="outline"
                  />
                </FormControl>
                <FormControl
                  label="Repetir senha"
                  isInvalid={!!errors.repeatPassword}
                >
                  <Input
                    placeholder="Repetir senha"
                    type="password"
                    size="lg"
                    {...register("repeatPassword", { required: true })}
                    variant="outline"
                  />
                  <FormErrorMessage>
                    {errors.repeatPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <Button type="submit" isLoading={isLoading} colorScheme="azul">
                Confirmar
              </Button>
              <Text
                fontSize="13px"
                fontWeight="500"
                fontFamily="inter"
                lineHeight="14.5px"
              >
                <Highlight
                  query={["Termos", "de Serviço", "Política de Privacidade"]}
                  styles={{ color: "azul.3" }}
                >
                  Ao cadastrar esta conta, você estará concordando com nossos
                  Termos de Serviço e nossa Política de Privacidade.
                </Highlight>
              </Text>
            </Flex>
          </form>
        </Flex>
      </Center>
    </MainCss>
  );
}
