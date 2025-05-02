import { IconArrowBack, IconUser } from "@/Components/icons";
import { IconEntidade } from "@/Components/icons/iconEntidade";
import { IconFornecedor } from "@/Components/icons/iconFornecedor";
import Logo from "@/Components/logo/Logo";
import { Button, Center, Divider, Flex, Heading } from "@chakra-ui/react";
import { FiguraCadastro } from "./Components/FiguraCadastro";
import { MainCss } from "./style";
import useRegistroConcluido from "./useRegistroConcluido";

export default function RegistroConcluido() {
  const { cliqueFornecedor, cliqueCidadao, cliqueEntidade } =
    useRegistroConcluido();
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
            <FiguraCadastro maxW="469px" w="100%" height="auto" />
          </section>
          <Divider orientation="vertical" />
          <div className="usuario-escopo">
            <Flex direction="column" gap="2rem" flex="1">
              <Heading fontSize="1.5rem">Cadastrar como</Heading>
              <Button
                onClick={cliqueFornecedor}
                size="lg"
                variant="solid"
                padding="0"
              >
                <Flex
                  justifyContent="space-between"
                  width="100%"
                  height="48px"
                  alignItems="center"
                >
                  <Flex
                    background="azul.3"
                    color="white"
                    width="48px"
                    height="48px"
                    alignItems="center"
                    justifyContent="center"
                    borderLeftRadius="6px"
                  >
                    <IconFornecedor height="20px" width="20px" />
                  </Flex>
                  <span>Fornecedor</span>
                  <Flex
                    width="48px"
                    height="48px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconArrowBack transform="rotate(180deg)" />
                  </Flex>
                </Flex>
              </Button>
              <Button
                onClick={cliqueEntidade}
                size="lg"
                variant="solid"
                padding="0"
              >
                <Flex
                  justifyContent="space-between"
                  width="100%"
                  height="48px"
                  alignItems="center"
                >
                  <Flex
                    background="verde.2"
                    color="white"
                    width="48px"
                    height="48px"
                    alignItems="center"
                    justifyContent="center"
                    borderLeftRadius="6px"
                  >
                    <IconEntidade height="20px" width="20px" />
                  </Flex>
                  <span>Entidade</span>
                  <Flex
                    width="48px"
                    height="48px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconArrowBack transform="rotate(180deg)" />
                  </Flex>
                </Flex>
              </Button>
              <Button
                onClick={cliqueCidadao}
                size="lg"
                variant="solid"
                padding="0"
              >
                <Flex
                  justifyContent="space-between"
                  width="100%"
                  height="48px"
                  alignItems="center"
                >
                  <Flex
                    background="laranja.1"
                    color="white"
                    width="48px"
                    height="48px"
                    alignItems="center"
                    justifyContent="center"
                    borderLeftRadius="6px"
                  >
                    <IconUser height="20px" width="20px" />
                  </Flex>
                  <span>Cidadão</span>
                  <Flex
                    width="48px"
                    height="48px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconArrowBack transform="rotate(180deg)" />
                  </Flex>
                </Flex>
              </Button>
            </Flex>
          </div>
        </Flex>
      </Center>
    </MainCss>
  );
}
