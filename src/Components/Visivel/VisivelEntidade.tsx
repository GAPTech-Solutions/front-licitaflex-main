import { useAuth } from "@/Context/AuthContext";
import { ProviderEnum } from "@/data/enum/ProviderEnum";
import { ReactNode } from "react";

type VisivelEntidadeProps = { children: ReactNode };
export default function VisivelEntidade(props: VisivelEntidadeProps) {
  const { tokenData } = useAuth();

  if (!tokenData || tokenData.tipoAcesso != ProviderEnum.Entidade) return <></>;

  return <>{props.children}</>;
}
