import { useAuth } from "@/Context/AuthContext";
import { ProviderEnum } from "@/data/enum/ProviderEnum";
import { ReactNode } from "react";

type VisivelFornecedorProps = { children: ReactNode };
export default function VisivelFornecedor(props: VisivelFornecedorProps) {
  const { tokenData } = useAuth();
  if (!tokenData || tokenData.tipoAcesso != ProviderEnum.Fornecedor)
    return <></>;

  return <>{props.children}</>;
}
