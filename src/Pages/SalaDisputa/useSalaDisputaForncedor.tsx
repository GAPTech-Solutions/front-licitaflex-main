import { useSalaDisputaService } from "@/data/services/sala.disputa.sevice";
import { useSalaDisputa } from "./SalaDisputaContext";
import useMutation from "@/hooks/requests/useMutation";
import { LoteSalaDisputa } from "@/data/types/EditalSalaDisputa";
import useToast from "@/hooks/toast/useToast";

export default function useSalaDisputaForncedor(loteId: string) {
  const { edital, lotes, fornecedorId } = useSalaDisputa();
  const lote = lotes[loteId];
  const statusLoteAptosLance = [1, 3];
  const salaService = useSalaDisputaService();
  const toast = useToast();
  const { mutate, isLoading } = useMutation({
    mutateFn(values: string) {
      return salaService.enviarLance(edital!.id, lote!.id, values);
    },
    options: {
      onSuccess() {
        toast({
          title: "Sucesso",
          description: "Lance enviado!",
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

  function enviarLance(value: string) {
    mutate(value);
  }

  function forncedorAptoLance() {
    if (!lote?.status) {
      return;
    }

    if (!statusLoteAptosLance.includes(lote.status)) {
      return false;
    }

    if (lote.status == 1 && lote.forncedoresAptosLance == null) {
      return true;
    }
    if (fornecedorId && lote.forncedoresAptosLance?.includes(fornecedorId)) {
      return true;
    }
    return false;
  }

  return {
    enviarLance,
    isLoadingEnviarLance: isLoading,
    forncedorAptoLance,
  };
}
