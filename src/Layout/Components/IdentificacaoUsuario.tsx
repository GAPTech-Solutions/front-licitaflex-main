import { IconArrowBack, IconUser } from "@/Components/icons";
import { IconEntidade } from "@/Components/icons/iconEntidade";
import { IconFornecedor } from "@/Components/icons/iconFornecedor";
import { ProviderEnum } from "@/data/enum/ProviderEnum";
import { Token } from "@/data/types/Token";
import { Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { IdentificacaoUsuarioCss } from "./style";

type IdentificadorUsuarioProps = {
  token?: Token;
};
export default function IdentificacaoUsuario(props: IdentificadorUsuarioProps) {
  const { token } = props;
  const tipoAcesso: Record<ProviderEnum, string> = {
    fornecedor: "Fornecedor",
    entidade: "Entidade Pública",
    cidadao: "Cidadão",
  };

  const nome = useMemo(() => {
    if (token?.tipoAcesso == ProviderEnum.Entidade) {
      return token.entidades.find((e) => e.id == token.providerId)?.nome;
    }
    if (token?.tipoAcesso == ProviderEnum.Fornecedor) {
      return token.fornecedores.find((e) => e.id == token.providerId)?.nome;
    }
    return token?.nome;
  }, [token]);

  const Icon = useMemo(() => {
    if (token?.tipoAcesso == ProviderEnum.Entidade) {
      return IconEntidade;
    }
    if (token?.tipoAcesso == ProviderEnum.Fornecedor) {
      return IconFornecedor;
    }
    return IconUser;
  }, [token]);
  return (
    <IdentificacaoUsuarioCss>
      <Text as="span">
        {nome}
        <Text>{tipoAcesso[token?.tipoAcesso ?? ProviderEnum.Cidadao]}</Text>
      </Text>
      <Icon height="24px" width="auto" />
      <IconArrowBack transform="rotate(270deg)" />
    </IdentificacaoUsuarioCss>
  );
}
