import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import useQuery from "@/hooks/requests/useQuery";

export default function useDadosEntidade() {
  const entidadeService = useEntidadePublicaService();
  const { data, isLoading } = useQuery({
    fetchFn: () => entidadeService.entidadeLogada(),
  });

  return { data, isLoading };
}
