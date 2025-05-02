import { useUsuarioService } from "@/data/services/usuario.service";
import useQuery from "@/hooks/requests/useQuery";

export default function usePerfil() {
  const usuarioService = useUsuarioService();
  const { data, isLoading } = useQuery({
    async fetchFn() {
      return await (
        await usuarioService.obterMeusDados()
      ).dados;
    },
  });

  return { data, isLoading };
}
