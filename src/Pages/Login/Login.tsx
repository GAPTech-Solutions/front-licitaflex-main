import Logo from "@/Components/logo/Logo";
import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  Link as LinkChakra,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FiguraLogin } from "./Components/FiguraLogin";
import { MainCss } from "./style";
import useLogin from "./useLogin";

export default function Login() {
  const {
    register,
    isLoading,
    registroSubmit,
    formState: { errors },
    linkCadastro,
  } = useLogin();
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
            <FiguraLogin maxW="469px" w="100%" height="auto" />
          </section>
          <Divider orientation="vertical" />
          <form method="post" onSubmit={registroSubmit}>
            <Flex direction="column" gap="0.5rem" flex="1" width="100%">
              <Heading fontSize="1.5rem" mb="0.5rem">
                Login
              </Heading>
              <FormControl label="E-mail" isInvalid={!!errors.email}>
                <Input
                  variant="outline"
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                />
              </FormControl>
              <FormControl label="Senha" isInvalid={!!errors.password}>
                <Input
                  placeholder="Senha"
                  type="password"
                  variant="outline"
                  {...register("password", { required: true })}
                />
              </FormControl>
              <Button type="submit" isLoading={isLoading} colorScheme="azul">
                Entrar
              </Button>
            </Flex>
            <Flex
              width="100%"
              direction="column"
              fontFamily="inter"
              fontSize="14px"
              fontWeight="500"
            >
              <Text>
                Não possui uma conta?{" "}
                <LinkChakra as={Link} color="azul.3" to={linkCadastro}>
                  Cadastre-se aqui!
                </LinkChakra>
              </Text>
              <LinkChakra as={Link} to="#esqueci" color="azul.3">
                Esqueceu a senha?
              </LinkChakra>
            </Flex>
          </form>
        </Flex>
      </Center>
    </MainCss>
  );
}
