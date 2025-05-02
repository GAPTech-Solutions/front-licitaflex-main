import { IconEdit, IconTrash, IconVerify } from "@/Components/icons";
import ModalContent from "@/Components/Modal/Conteudo/ModalContent";
import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import VisivelEntidade from "@/Components/Visivel/VisivelEntidade";
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLicitacaoEntidade from "./useLicitacaoEntidade";
import ListaEditalItem from "@/Components/lista/ListaEditalItem";
import { IconDropDown } from "@/Components/icons/iconDropDown";
import { EditalStatusEnum } from "@/data/enum/EditalStatusEnum";

export default function LicitacaoEntidade() {
  const {
    data,
    linkCadastro,
    linkEdicao,
    cliqueDelete,
    cliqueIniciarDisputa,
    cliqueSalaDisputa,
    propsModalDelete,
    isLoading,
  } = useLicitacaoEntidade();

  return (
    <SuspenseLicita isLoading={isLoading}>
      <ModalContent {...propsModalDelete} />
      <Stack spacing={4} padding="2rem">
        <VisivelEntidade>
          <Flex>
            <Button as={Link} to={linkCadastro}>
              Adicionar Edital
            </Button>
          </Flex>
        </VisivelEntidade>
        {data?.map((u) => (
          <ListaEditalItem edital={u} key={u.id}>
            <Flex>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<IconDropDown />}
                  colorScheme="blue"
                  variant="ghost"
                >
                  Ações
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<IconEdit />} as={Link} to={linkEdicao(u)}>
                    Editar Edital
                  </MenuItem>
                  <MenuItem
                    icon={<IconTrash />}
                    onClick={() => cliqueDelete(u.id)}
                  >
                    Excluir Edital
                  </MenuItem>
                  {u.status == EditalStatusEnum.Publicado && (
                    <MenuItem
                      icon={<IconVerify />}
                      onClick={() => cliqueIniciarDisputa(u)}
                    >
                      Iniciar Disputa
                    </MenuItem>
                  )}
                  {u.status == EditalStatusEnum.Disputa && (
                    <MenuItem
                      icon={<IconVerify />}
                      onClick={() => cliqueSalaDisputa(u)}
                    >
                      Sala de disputa
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Flex>
          </ListaEditalItem>
        ))}
      </Stack>
    </SuspenseLicita>
  );
}
