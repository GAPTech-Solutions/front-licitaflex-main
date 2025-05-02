import { useFornecedorService } from "@/data/services/fornecedor.service";
import useQuery from "@/hooks/requests/useQuery";
import { useCadastroFornecedor as useFornecedorContext } from "../CadastroFornecedor/Context/CadastroFornecedorContext";

export default function useCadastroFornecedor() {
  const fornecedor = useFornecedorContext();

  const fornecedorService = useFornecedorService();
  const { isLoading } = useQuery({
    fetchFn: () => fornecedorService.rascunho(),
    options: {
      onSuccess(data) {
        if (data?.dados) {
          fornecedor.informarFornecedor(data.dados);
        }
      },
    },
  });
  return { isLoading };
}
