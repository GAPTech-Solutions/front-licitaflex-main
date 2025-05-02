import { IconEdit2 } from "@/Components/icons/iconEdit2";
import ModalContent from "@/Components/Modal/Conteudo/ModalContent";
import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import VisivelFornecedor from "@/Components/Visivel/VisivelFornecedor";

import {
  Box,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TabDetalhes from "./Tabs/TabDetalhes";
import TabLote from "./Tabs/TabLote";
import TabSolicitacoes from "./Tabs/TabSolicitacoes";
import { LicitacaoProvider, useLicitacao } from "./contextLicitacao";
import Visivel from "@/Components/Visivel/Visivel";
import { EditalStatusEnum } from "@/data/enum/EditalStatusEnum";

export default function Licitacao() {
  const {
    edital: data,
    isLoading,
    modalSolicitacaoClick,
    linkParticipar,
    ePregoeiro,
  } = useLicitacao();
  return (
    <LicitacaoProvider>
      <SuspenseLicita isLoading={isLoading}>
        <Stack spacing={4} height="100%" overflowY="auto" padding="1rem 0">
          <Flex
            padding="0 2rem"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Heading
                fontSize="20px"
                fontWeight="700"
                textTransform="uppercase"
              >
                {data?.nomeEntidade}
              </Heading>
              <Text fontSize="14px" fontWeight="500" textTransform="uppercase">
                {data?.cidadeEntidade} - {data?.estadoEntidade}
              </Text>
            </Box>
            <Flex gap="1.25rem">
              <Visivel show={!ePregoeiro}>
                <Button onClick={() => modalSolicitacaoClick(2)} size="sm">
                  Impugnar
                </Button>
                <Button onClick={() => modalSolicitacaoClick(1)} size="sm">
                  Esclarecer
                </Button>
              </Visivel>
              <VisivelFornecedor>
                {data?.status == EditalStatusEnum.Publicado && (
                  <Button
                    as={Link}
                    to={linkParticipar}
                    size="sm"
                    colorScheme="azul"
                  >
                    Participar
                  </Button>
                )}
              </VisivelFornecedor>
            </Flex>
          </Flex>
          <Flex flex="1">
            <Tabs variant="line" width="100%">
              <TabList>
                <Tab padding="0 2rem">Detalhes</Tab>
                <Tab padding="0 2rem">Lotes</Tab>
                <Tab paddingInline="2rem">Solicitações</Tab>
              </TabList>
              <TabPanels padding="0 1rem">
                <TabPanel height="calc(100vh - 14rem)" overflowY="auto">
                  <TabDetalhes />
                </TabPanel>
                <TabPanel height="calc(100vh - 14rem)" overflowY="auto">
                  <TabLote />
                </TabPanel>
                <TabPanel height="calc(100vh - 14rem)" overflowY="auto">
                  <TabSolicitacoes />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Stack>
      </SuspenseLicita>
    </LicitacaoProvider>
  );
}
