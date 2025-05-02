import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import { Text } from "@chakra-ui/react";
import useDadosEntidade from "./useDadosEntidade";

export default function DadosEntidade() {
  const { data, isLoading } = useDadosEntidade();
  return (
    <SuspenseLicita isLoading={isLoading}>
      <Text>{data?.dados.nome}</Text>
    </SuspenseLicita>
  );
}
