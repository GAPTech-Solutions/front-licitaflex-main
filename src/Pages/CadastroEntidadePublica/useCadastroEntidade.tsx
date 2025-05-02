import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import useQuery from "@/hooks/requests/useQuery";
import { useCadastroEntidadeContext } from "./Context/CadastroEntidadeContext";

export default function useCadastroEntidade() {
  const entidadePublica = useCadastroEntidadeContext();

  const entidadeService = useEntidadePublicaService();
  const { isLoading } = useQuery({
    fetchFn: () => entidadeService.rascunho(),
    options: {
      onSuccess(data) {
        if (data?.dados) {
          entidadePublica.informarEntidadePublica(data.dados);
        }
      },
    },
  });
  return { isLoading };
}
