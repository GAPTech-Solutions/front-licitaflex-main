import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";

export default function useRegistroConcluido() {
  const { navigate } = useNavigateLicitaFlex();
  const cliqueFornecedor = () => {
    navigate("cadastro-fornecedor");
  };

  const cliqueEntidade = () => {
    navigate("cadastro-entidade");
  };

  const cliqueCidadao = () => {
    navigate("inicio");
  };

  return { cliqueFornecedor, cliqueEntidade, cliqueCidadao };
}
