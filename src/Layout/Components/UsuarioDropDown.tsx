import { useAuth } from "@/Context/AuthContext";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import {
  Button,
  Divider,
  Flex,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import IdentificacaoUsuario from "./IdentificacaoUsuario";

export default function UsuarioDropDown() {
  const { tokenData, atualizarToken } = useAuth();
  const { navigate } = useNavigateLicitaFlex();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const alterarContexto = async (
    provider: "cidadao" | "fornecedor" | "entidade",
    id?: string
  ) => {
    if (tokenData?.tipoAcesso == provider && tokenData.providerId == id) return;
    await atualizarToken({ tipoAcesso: provider, providerId: id });
    navigate("inicio");
    onClose();
  };
  return (
    <Popover placement="bottom-end" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button variant="unstyled" onClick={onToggle}>
          <IdentificacaoUsuario token={tokenData} />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="800px">
          <PopoverBody>
            <Flex gap="2rem">
              <Flex direction="column" gap="1rem">
                <Text>
                  Acesse os entes públicos que você cadastrou o recebeu convite
                  de acesso.
                </Text>
                {tokenData?.entidades?.map((f) => (
                  <Button
                    variant="link"
                    onClick={() => alterarContexto("entidade", f.id)}
                    key={f.id}
                  >
                    {f.nome}
                  </Button>
                ))}
                <Divider />
                <Link
                  as={NavLink}
                  to="cadastrar-entidade-publica"
                  onClick={onClose}
                >
                  + Cadastrar Entidade
                </Link>
              </Flex>
              <Flex direction="column" gap="1rem">
                <Text>
                  Acesse os fornecedores que você cadastrou o recebeu convite de
                  acesso.
                </Text>
                {tokenData?.fornecedores?.map((f) => (
                  <Button
                    variant="link"
                    key={f.id}
                    onClick={() => alterarContexto("fornecedor", f.id)}
                  >
                    {f.nome}
                  </Button>
                ))}

                <Divider />
                <Link as={NavLink} to="cadastrar-fornecedor" onClick={onClose}>
                  + Cadastrar Fornecedor
                </Link>
              </Flex>
              <Flex direction="column" gap="1rem">
                <Text>
                  Pesquise a acompanhe os processos e sessões de disputa de
                  compras dos entes públicos e fornecedores.
                </Text>
                <Button
                  variant="link"
                  onClick={() => alterarContexto("cidadao")}
                >
                  Acessar como cidadão
                </Button>
              </Flex>
            </Flex>
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <Link as={NavLink} to="sair">
              Sair
            </Link>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
