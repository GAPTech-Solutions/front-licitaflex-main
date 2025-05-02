import { useCidades, useEstados } from "@/Context/MetaDadosContext";
import { CadastroEntidade } from "@/data/dto/cadastro.entidade";
import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import useMutation from "@/hooks/requests/useMutation";
import useToast from "@/hooks/toast/useToast";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCadastroEntidadeContext } from "../Context/CadastroEntidadeContext";

type Regioes = {
  estado: string;
  regiao: number;
};
export default function useFormRegioes() {
  const toast = useToast();
  const { regiao, informarEntidadePublica, dadosIdentificacao } =
    useCadastroEntidadeContext();
  const { register, formState, watch, handleSubmit, reset } = useForm<Regioes>(
    {}
  );
  const { navigate } = useNavigateLicitaFlex();
  const { obterCidadesPorEstado } = useCidades();
  const estados = useEstados();
  const estado = watch("estado");

  const cidades = useMemo(() => {
    if (!estado) return [];
    return obterCidadesPorEstado(estado);
  }, [estado]);

  const entidadeService = useEntidadePublicaService();
  const { mutate, isLoading } = useMutation({
    mutateFn(values: CadastroEntidade) {
      return entidadeService.cadastrar(values);
    },
    options: {
      onSuccess: (data) => {
        if (data) informarEntidadePublica(data.dados);
        reset();
      },
    },
  });

  const { mutate: enviarAvaliacao, isLoading: isLoadingEnviarAvaliacao } =
    useMutation<undefined, void>({
      mutateFn() {
        return entidadeService.enviarAvaliacao(dadosIdentificacao?.id!);
      },
      options: {
        onError(error) {
          toast({
            title: "Erro",
            description: error.message,
          });
        },
        onSuccess() {
          toast({
            title: "Sucesso",
            description: "Vamos avaliar a entidade e logo retornamos!",
          });
          navigate("inicio");
        },
      },
    });

  const salvarRegiao = (dados: Regioes) => {
    const regioes = [
      Number(dados.regiao),
      ...(dadosIdentificacao?.regiao ?? []),
    ];
    mutate({ ...dadosIdentificacao, regiao: regioes } as CadastroEntidade);
  };

  const clickEnviarAvaliacao = () => {
    enviarAvaliacao(undefined);
  };
  return {
    register,
    formState,
    cidades,
    estados,
    regiao,
    submit: handleSubmit(salvarRegiao),
    isLoading,
    enviarAvaliacao: clickEnviarAvaliacao,
    isLoadingEnviarAvaliacao,
  };
}
