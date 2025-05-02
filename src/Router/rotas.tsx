import React, { Suspense } from "react";
import LayoutBase from "@/Layout/LayoutBase";

import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SalaDisputa from "@/Pages/SalaDisputa/SalaDisputa";
import { LicitacaoProvider } from "@/Pages/LicitacaoDetalhes/contextLicitacao";
import { SalaDisputaProvider } from "@/Pages/SalaDisputa/SalaDisputaContext";
import { CadastroEditalProvider } from "@/Pages/CadastrarEdital/Context/CadastroEditalContext";
import { FornecedorParticiparProvider } from "@/Pages/FornecedorParticipar/Context/FornecedorParticiparContext";
const CadastroEdital = React.lazy(
  () => import("@/Pages/CadastrarEdital/CadastroEdital")
);
const CadastroEntidade = React.lazy(
  () => import("@/Pages/CadastroEntidadePublica/CadastroEntidade")
);
const CadastroFornecedor = React.lazy(
  () => import("@/Pages/CadastroFornecedor/CadastroFornecedor")
);
const DadosEntidade = React.lazy(
  () => import("@/Pages/DadosEntidade/DadosEntidade")
);
const EntidadeUsuario = React.lazy(
  () => import("@/Pages/EntidadeUsuarios/EntidadeUsuario")
);
const FornecedorParticipar = React.lazy(
  () => import("@/Pages/FornecedorParticipar/FornecedorParticipar")
);

const Licitacao = React.lazy(
  () => import("@/Pages/LicitacaoDetalhes/Licitacao")
);

const LicitacaoEntidade = React.lazy(
  () => import("@/Pages/LicitacaoEntidade/LicitacaoEntidade")
);

const LicitacaoFornecedor = React.lazy(
  () => import("@/Pages/ListaLicitacao/ListaLicitacao")
);
const Login = React.lazy(() => import("../Pages/Login/Login"));

const Logout = React.lazy(() => import("@/Pages/Logout/Logout"));
const Perfil = React.lazy(() => import("@/Pages/Perfil/Perfil"));

const RegistroConcluido = React.lazy(
  () => import("@/Pages/RegistroUsuario/RegistroConcluido")
);
const RegistroUsuario = React.lazy(
  () => import("@/Pages/RegistroUsuario/RegistroUsuario")
);

export const rotas: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutBase />
      </ProtectedRoute>
    ),
    id: "inicio",
    children: [
      {
        id: "cadastro-fornecedor",
        path: "cadastrar-fornecedor",
        element: <CadastroFornecedor />,
      },
      { id: "perfil", path: "meus-dados", element: <Perfil /> },
      {
        id: "cadastro-entidade",
        path: "cadastrar-entidade-publica",
        element: <CadastroEntidade />,
      },
      {
        id: "licitacao",
        path: "licitacao",
        element: <Outlet />,
        children: [
          {
            path: ":idEdital",
            id: "visualizar-licitacao",
            element: (
              <LicitacaoProvider>
                <Licitacao />
              </LicitacaoProvider>
            ),
          },
        ],
      },
      {
        id: "entidade",
        path: "entidade",
        element: <Outlet />,
        children: [
          {
            index: true,
            id: "dados-entidade",
            element: <DadosEntidade />,
          },
          {
            id: "cadastro-edital",
            path: "cadastrar-edital",
            element: (
              <CadastroEditalProvider>
                <CadastroEdital />
              </CadastroEditalProvider>
            ),
          },
          {
            id: "editar-edital",
            path: "edital/:idEdital",
            element: (
              <CadastroEditalProvider>
                <CadastroEdital />
              </CadastroEditalProvider>
            ),
          },

          {
            id: "usuarios-entidade",
            path: "usuarios",
            element: <EntidadeUsuario />,
          },
          {
            id: "licitacoes-entidade",
            path: "licitacoes",
            element: <LicitacaoEntidade />,
          },
        ],
      },
      {
        id: "fornecedor",
        path: "fornecedor",
        element: <Outlet />,
        children: [
          {
            id: "licitacoes-fornecedor",
            path: "licitacoes-fornecedor",
            element: <LicitacaoFornecedor />,
          },
          {
            id: "participar-licitacao",
            path: "participar/:idEdital",
            element: (
              <FornecedorParticiparProvider>
                <FornecedorParticipar />
              </FornecedorParticiparProvider>
            ),
          },
        ],
      },
      {
        id: "logout",
        path: "sair",
        element: <Logout />,
      },
    ],
  },
  {
    path: "/sala-disputa/:idEdital",
    id: "sala-disputa",
    element: (
      <ProtectedRoute>
        <SalaDisputaProvider>
          <SalaDisputa />
        </SalaDisputaProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/cadastro",
    id: "cadastro-plataforma",
    element: (
      <Suspense>
        <RegistroUsuario />
      </Suspense>
    ),
  },
  {
    path: "/cadastro-concluido",
    id: "cadastro-plataforma-concluido",
    element: (
      <ProtectedRoute>
        <Suspense>
          <RegistroConcluido />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",

    id: "login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(rotas);

export default router;
