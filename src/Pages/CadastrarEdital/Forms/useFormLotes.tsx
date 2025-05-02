import useModal from "@/Components/Modal/Conteudo/useModal";
import { useWizard } from "@/Components/winzard/context/WizardContext";
import { CadastroEditalDto } from "@/data/dto/cadastro.edital";
import { useEditalService } from "@/data/services/edital.sevice";
import { Lote } from "@/data/types/Lote";
import useMutation from "@/hooks/requests/useMutation";
import useQuery from "@/hooks/requests/useQuery";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import FormLote from "../Component/FormLote";
import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";

export default function useFormLotes() {
  const {
    setData,
    wizard: { data },
    prevStep,
  } = useWizard<CadastroEditalDto>();

  const { navigate } = useNavigateLicitaFlex();
  const serviceEdital = useEditalService();

  const { reFetch } = useQuery({
    fetchFn: async () =>
      (await serviceEdital.obterEdital(data?.id!))?.dados?.lotes,
    options: {
      onSuccess(data) {
        setData({ lotes: data ?? [] });
      },
    },
  });

  const { mutate: removeLote } = useMutation({
    async mutateFn(value: { id: string; idLote: string }) {
      return serviceEdital.removerLote(value.id, value.idLote);
    },
    options: {
      onSuccess: reFetch,
    },
  });

  const { mutate: publicarEdital } = useMutation({
    async mutateFn(value: string) {
      return serviceEdital.publicarEdital(value);
    },
    options: {
      onSuccess() {
        navigate("visualizar-licitacao", { idEdital: data?.id ?? "" });
      },
    },
  });

  const { close, open, props, openConfirm } = useModal({ size: "6xl" });

  const adicionarLote = () => {
    open({
      title: "Adicionar Lote",
      content: {
        component: FormLote,
        props: {
          editalId: data?.id!,
          formatoLance: data?.formatoLance!,
          close,
        },
      },
      onClose: reFetch,
    });
  };

  const editarLote = (lote: Lote) => {
    open({
      title: `Editar Lote ${lote.sequencia}`,
      content: {
        component: FormLote,
        props: {
          editalId: data?.id!,
          formatoLance: data?.formatoLance!,
          lote,
          close,
        },
      },
      onClose: reFetch,
    });
  };

  const excluirLote = (lote: Lote) => {
    openConfirm({
      message: `Confirma a exclusão do Lote ${lote.sequencia} ?`,
      onConfirm: () => removeLote({ id: data?.id!, idLote: lote.id }),
    });
  };

  const publicarLicitacao = () => {
    openConfirm({
      title: "Publicar Edital",
      message: `Confirma a publicação do Edital ${data?.numeroProcesso} ?`,
      onConfirm: () => publicarEdital(data?.id!),
    });
  };
  const servicePersistEdital = useEntidadePublicaService();
  const { mutate, isLoading: isLoadingRascunho } = useMutation({
    mutateFn(values: CadastroEditalDto) {
      return servicePersistEdital.adicionarEdital(values);
    },
    options: {
      onSuccess() {
        navigate("licitacoes-entidade");
      },
    },
  });
  const salvarRascunho = () => {
    if (!data) {
      return;
    }
    const dataRascunho = {
      ...data,
      dataInicioDisputa: new Date(data.dataInicioDisputa!).toISOString(),
      dataLimiteImpugnacao: new Date(data.dataLimiteImpugnacao!).toISOString(),
      dataPublicacaoDiario: new Date(data.dataPublicacaoDiario!).toISOString(),
    };
    mutate(dataRascunho as CadastroEditalDto);
  };

  return {
    adicionarLote,
    editarLote,
    excluirLote,
    propsModal: props,
    lotes: data?.lotes,
    isLoadingRascunho,
    prevStep,
    salvarRascunho,
    publicarLicitacao,
  };
}
