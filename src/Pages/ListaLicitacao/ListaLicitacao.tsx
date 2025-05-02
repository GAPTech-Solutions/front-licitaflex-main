import { IconArrowForward } from "@/Components/icons";
import ListaEditalItem from "@/Components/lista/ListaEditalItem";
import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import { Button, Flex, Stack, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Filtro from "./components/Filtro";
import useLicitacaoFornecedor from "./useListaLicitacao";

export default function LicitacaoFornecedor() {
  const { data, linkVisualizacao, isLoading } = useLicitacaoFornecedor();

  return (
    <SuspenseLicita isLoading={isLoading}>
      <Filtro />
      <Stack spacing={4}>
        <VStack padding="1rem 2rem 1rem 2rem">
          {data?.map((u) => (
            <ListaEditalItem edital={u} key={u.id}>
              <Flex>
                <Button
                  colorScheme="azul"
                  as={Link}
                  to={linkVisualizacao(u.id)}
                  rightIcon={<IconArrowForward />}
                >
                  Acessar Edital
                </Button>
              </Flex>
            </ListaEditalItem>
          ))}
        </VStack>
      </Stack>
    </SuspenseLicita>
  );
}
