import { useWizard } from "@/Components/winzard/context/WizardContext";
import { CadastroEditalDto } from "@/data/dto/cadastro.edital";
import { TipoUsuarioEntidadePublicaEnum } from "@/data/enum/TipoUsuarioEntidadePublicaEnum";
import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import useQuery from "@/hooks/requests/useQuery";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export default function useFormEquipe() {
  const {
    setData,
    wizard: { data },
    nextStep,
    prevStep,
  } = useWizard<CadastroEditalDto>();

  const entidadeService = useEntidadePublicaService();
  const { register, handleSubmit, formState, getValues, setValue } =
    useForm<CadastroEditalDto>({
      defaultValues: { ...data },
    });
  const { data: usuarios, isLoading } = useQuery({
    fetchFn: async () => (await entidadeService.usuarios()).dados,
    options: {
      onSuccess: () => {
        const dataExistente = getValues();
        setTimeout(() => {
          setValue("pregoeiro", dataExistente.pregoeiro);
          setValue("autoridadeSuperior", dataExistente.autoridadeSuperior);
          setValue("equipeApoio", dataExistente.equipeApoio);
        }, 50);
      },
    },
  });

  const usuariosSeparados = useMemo(() => {
    const pregoeiros =
      usuarios?.filter(
        (u) =>
          u.tipoUsuarioEntidadePublica ==
          TipoUsuarioEntidadePublicaEnum.Pregoeiro
      ) ?? [];
    const auxiliar =
      usuarios?.filter(
        (u) =>
          u.tipoUsuarioEntidadePublica ==
          TipoUsuarioEntidadePublicaEnum.EquipeAuxiliar
      ) ?? [];
    const autoridadeSuperior =
      usuarios?.filter(
        (u) =>
          u.tipoUsuarioEntidadePublica ==
          TipoUsuarioEntidadePublicaEnum.AutoridadeSuperior
      ) ?? [];
    return { pregoeiros, auxiliar, autoridadeSuperior };
  }, [isLoading]);
  const salvarEtapa = (dados: CadastroEditalDto) => {
    setData({ ...data, ...dados });
    nextStep();
  };
  return {
    register,
    submit: handleSubmit(salvarEtapa),
    formState,
    prevStep,
    ...usuariosSeparados,
  };
}
