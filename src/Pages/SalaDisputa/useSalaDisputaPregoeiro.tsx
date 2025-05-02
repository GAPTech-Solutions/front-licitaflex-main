import { useSalaDisputaService } from "@/data/services/sala.disputa.sevice";
import { useSalaDisputa } from "./SalaDisputaContext";
import useMutation from "@/hooks/requests/useMutation";
import { LoteSalaDisputa } from "@/data/types/EditalSalaDisputa";
import useToast from "@/hooks/toast/useToast";

export default function useSalaDisputaPregoeiro() {
  const { edital } = useSalaDisputa();
  const toast = useToast();
  const salaDisputaService = useSalaDisputaService();

  const { isLoading, mutate } = useMutation({
    mutateFn(lote: string) {
      return salaDisputaService.iniciarDisputaLote(edital!.id, lote);
    },
    options: {
      onSuccess() {
        toast({
          title: "Sucesso",
          description: "Disputa iniciada",
        });
      },
      onError(error) {
        toast({
          title: "Erro",
          description: error.message,
        });
      },
    },
  });

  const { isLoading: isLoadingDesempate, mutate: mutateDesempate } =
    useMutation({
      mutateFn(lote: string) {
        return salaDisputaService.iniciarDesempate(edital!.id, lote);
      },
      options: {
        onError(error) {
          toast({
            title: "Erro",
            description: error.message,
          });
        },
      },
    });

  const { isLoading: isLoadingNegociacao, mutate: mutateNegociacao } =
    useMutation({
      mutateFn(lote: string) {
        return salaDisputaService.iniciarNegociacao(edital!.id, lote);
      },
      options: {
        onError(error) {
          toast({
            title: "Erro",
            description: error.message,
          });
        },
      },
    });

  const { isLoading: isLoadingVencedor, mutate: mutateVencedor } = useMutation({
    mutateFn(lote: string) {
      return salaDisputaService.declararVencedor(edital!.id, lote);
    },
    options: {
      onError(error) {
        toast({
          title: "Erro",
          description: error.message,
        });
      },
    },
  });

  function iniciarDisptuaLote(lote: LoteSalaDisputa) {
    mutate(lote.id);
  }

  function iniciarDesempate(lote: LoteSalaDisputa) {
    mutateDesempate(lote.id);
  }

  function iniciarNegociacao(lote: LoteSalaDisputa) {
    mutateNegociacao(lote.id);
  }

  function declararVencedor(lote: LoteSalaDisputa) {
    mutateVencedor(lote.id);
  }

  return {
    isLoadingIniciarDisputa: isLoading,
    isLoadingDesempate,
    isLoadingNegociacao,
    isLoadingVencedor,
    iniciarDisptuaLote,
    iniciarDesempate,
    iniciarNegociacao,
    declararVencedor,
  };
}
