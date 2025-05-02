import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Input,
  Flex,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
export default function FornecedorDados() {
  return (
    <Tabs>
      <TabList>
        <Tab>Dados Gerais</Tab>
        <Tab>Documentos</Tab>
        <Tab>Operadores</Tab>
        <Tab>Dados Bancários</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Stack spacing={4}>
            <Flex gap="1rem">
              <Input placeholder="Razão Social" size="lg" />
              <Input placeholder="Nome Fantasia" size="lg" />
            </Flex>
            <Flex gap="1rem">
              <Input placeholder="País" size="lg" width="15%" />
              <Input placeholder="UF" size="lg" width="10%" />
              <Input placeholder="Tipo" size="lg" width="25%" />
              <Input placeholder="CNPJ" size="lg" width="10%" />
              <Input placeholder="Inscrição Estadual" size="lg" width="30%" />
              <Checkbox defaultChecked width="10%">
                Isento?
              </Checkbox>
            </Flex>
            <Divider />
            <Flex gap="1rem">
              <Input placeholder="CEP" size="lg" width="30%" />
              <Input placeholder="Logradouro" size="lg" width="60%" />
              <Input placeholder="Número" size="lg" width="10%" />
            </Flex>
            <Flex gap="1rem">
              <Input placeholder="Complemento" size="lg" width="30%" />
              <Input placeholder="Bairro" size="lg" width="30%" />
              <Input placeholder="Estado" size="lg" width="10%" />
              <Input placeholder="Cidade" size="lg" width="30%" />
            </Flex>
            <Divider />
            <Flex gap="1rem">
              <Input placeholder="E-mail" size="lg" width="50%" />
              <Input placeholder="Telefone" size="lg" width="50%" />
            </Flex>
            <Flex gap="1rem">
              <Input placeholder="E-mail" size="lg" width="50%" />
              <Input placeholder="Telefone" size="lg" width="50%" />
            </Flex>
          </Stack>
        </TabPanel>
        <TabPanel>
          <p>Documentos!</p>
        </TabPanel>
        <TabPanel>
          <p>Operadores!</p>
        </TabPanel>
        <TabPanel>
          <p>Dados Bancários!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
