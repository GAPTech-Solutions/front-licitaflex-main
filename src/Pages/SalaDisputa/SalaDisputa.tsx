import { IconInfo2 } from "@/Components/icons/iconInfo2";
import { CardLicita } from "@/Components/layout/CardLicita";
import Logo from "@/Components/logo/Logo";
import LabelText from "@/Components/Text/LabelText";
import UsuarioDropDown from "@/Layout/Components/UsuarioDropDown";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react";
import CardLoteItem from "./Component/CardLoteItem";
import CardTop from "./Component/CardTop";

import Chat from "./Component/Chat";
import Detalhe from "./Component/Detalhe";
import TitleSala from "./Component/TitleSala";
import { ContainerSalaCss, HeaderCss, LayoutSalaDisputaCss } from "./style";
import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import { useSalaDisputa } from "./SalaDisputaContext";

export default function SalaDisputa() {
  const { isLoading, edital, loteAtivo } = useSalaDisputa();

  return (
    <SuspenseLicita isLoading={isLoading}>
      <LayoutSalaDisputaCss>
        <HeaderCss>
          <Logo height="48" />
          <TitleSala />
          <UsuarioDropDown />
        </HeaderCss>
        <Chat />
        <ContainerSalaCss>
          <Flex direction="column" padding="2rem 2rem 0.5rem 2rem">
            <Flex alignItems="center" gap="1rem">
              <Text
                textTransform="uppercase"
                fontSize="1.25rem"
                fontWeight="700"
              >
                {edital?.entidadePublica}
              </Text>
              <IconInfo2 />
            </Flex>
            <Text
              textTransform="uppercase"
              fontSize="0.875rem"
              fontWeight="500"
            >
              Pregão Eletrônico - nº {edital?.numeroPregao}
            </Text>
          </Flex>
          <Tabs>
            <TabList>
              <Tab paddingLeft="2rem">Todos</Tab>
              <Tab>Iniciados</Tab>
              <Tab>Em disputa</Tab>
              <Tab>Encerrados</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <CardTop />
                <Flex gap="1rem" direction="column" padding="0 0.5rem 0 1rem">
                  {edital?.lotes.map((lote) => (
                    <CardLoteItem key={lote.id} lote={lote} />
                  ))}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ContainerSalaCss>
        {loteAtivo && <Detalhe key={loteAtivo} />}
      </LayoutSalaDisputaCss>
    </SuspenseLicita>
  );
}
