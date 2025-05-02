import { useWizard } from "@/Components/winzard/context/WizardContext";
import { CadastroEditalDto } from "@/data/dto/cadastro.edital";
import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import { Segmento } from "@/data/types/Segmento";
import useMutation from "@/hooks/requests/useMutation";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useFormDadosGerais() {
  const {
    setData,
    wizard: { data: dataWizard },
    nextStep,
    prevStep,
  } = useWizard<CadastroEditalDto>();

  const { navigate } = useNavigateLicitaFlex();

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<CadastroEditalDto>({
      defaultValues: { ...dataWizard },
    });

  const serviceEdital = useEntidadePublicaService();
  const { mutate, isLoading } = useMutation({
    mutateFn(values: CadastroEditalDto) {
      return serviceEdital.adicionarEdital(values);
    },
    options: {
      onSuccess(data) {
        if (dataWizard?.id) {
          nextStep();
          return;
        }
        navigate("editar-edital", { idEdital: data?.dados.id! }, 5);
      },
    },
  });

  const [segmentos, tipoIntervalo] = watch(["segmentos", "tipoIntervalo"]);

  useEffect(() => {
    if (tipoIntervalo == 2) setValue("tipoTaxa", true);
  }, [tipoIntervalo]);

  const adicionarSegmentos = async (segmentos: Segmento[]) => {
    setValue("segmentos", segmentos);
  };

  const salvarEtapa = (dados: CadastroEditalDto) => {
    setData({
      ...dataWizard,
      ...dados,
      dataInicioDisputa: dados.dataInicioDisputa.parseDateIso(),
      dataLimiteImpugnacao: dados.dataLimiteImpugnacao.parseDateIso(),
      dataPublicacaoDiario: dados.dataPublicacaoDiario.parseDateIso(),
    });
    if (dataWizard?.id) {
      nextStep();
      return;
    }
    const dataInicioDisputa = new Date(dados.dataInicioDisputa);
    const dataLimiteImpugnacao = new Date(dados.dataLimiteImpugnacao);
    const dataPublicacaoDiario = new Date(dados.dataPublicacaoDiario);
    dados.dataInicioDisputa = dataInicioDisputa.toISOString();
    dados.dataLimiteImpugnacao = dataLimiteImpugnacao.toISOString();
    dados.dataPublicacaoDiario = dataPublicacaoDiario.toISOString();
    const dadosConcatenados = { ...dataWizard, ...dados };
    mutate(dadosConcatenados);
  };
  return {
    register,
    submit: handleSubmit(salvarEtapa),
    formState,
    adicionarSegmentos,
    segmentos,
    tipoIntervalo,
    isLoading,
    prevStep,
    dataWizard,
  };
}
