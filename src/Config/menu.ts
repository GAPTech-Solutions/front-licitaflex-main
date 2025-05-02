import { IconUser } from "@/Components/icons";
import { IconCadastro } from "@/Components/icons/iconCadastro";
import { IconDados } from "@/Components/icons/iconDados";
import { IconEntidade } from "@/Components/icons/iconEntidade";
import { IconHome } from "@/Components/icons/iconHome";
import { IconMartelo } from "@/Components/icons/iconMartelo";
import { IconSair } from "@/Components/icons/iconSair";
import { IconSuporte } from "@/Components/icons/iconSuporte";
import { ProviderEnum } from "@/data/enum/ProviderEnum";
import { IconProps } from "@chakra-ui/react";
import React from "react";

type Menu = {
  idRota: string;
  icon: React.FC<IconProps>;
  text: string;
};
const inicio: Menu = {
  idRota: "inicio",
  icon: IconHome,
  text: "Início",
};

const licitacoes: Menu = {
  idRota: "licitacoes-fornecedor",
  icon: IconMartelo,
  text: "Licitações",
};
const duvidas: Menu = {
  idRota: "inicio",
  icon: IconSuporte,
  text: "Dúvidas e Suporte",
};

const encerrar: Menu = {
  idRota: "logout",
  icon: IconSair,
  text: "Encerrar Sessão",
};

const menu: Record<ProviderEnum, Menu[]> = {
  cidadao: [
    inicio,
    licitacoes,
    {
      idRota: "cadastro-fornecedor",
      icon: IconCadastro,
      text: "Cadastrar Fornecedor",
    },
    {
      idRota: "cadastro-entidade",
      icon: IconCadastro,
      text: "Cadastrar Entidade Pública",
    },
    {
      idRota: "perfil",
      icon: IconDados,
      text: "Meus Dados",
    },
    duvidas,
    encerrar,
  ],
  fornecedor: [inicio, licitacoes, duvidas, encerrar],
  entidade: [
    inicio,
    {
      idRota: "licitacoes-entidade",
      icon: IconMartelo,
      text: "Licitações",
    },
    {
      idRota: "dados-entidade",
      icon: IconEntidade,
      text: "Dados da Entidade",
    },
    {
      idRota: "usuarios-entidade",
      icon: IconUser,
      text: "Usuários",
    },
    duvidas,
    encerrar,
  ],
};

export default menu;
