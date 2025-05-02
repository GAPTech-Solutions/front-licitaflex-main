import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import { Text } from "@chakra-ui/react";
import usePerfil from "./usePerfil";

export default function Perfil() {
  const { data, isLoading } = usePerfil();
  return (
    <SuspenseLicita isLoading={isLoading}>
      <Text>{data?.nome}</Text>
      <Text>{data?.email}</Text>
      <Text>{data?.celular}</Text>
      <Text>{data?.cpf}</Text>
    </SuspenseLicita>
  );
}
