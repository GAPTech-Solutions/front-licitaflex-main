import { useWizard } from "@/Components/winzard/context/WizardContext";
import { useNaturezaJuridica } from "@/Context/MetaDadosContext";
import { CadastroEntidade } from "@/data/dto/cadastro.entidade";
import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import { isUnprocessableEntityError } from "@/hooks/requests/errors/unprocessableEntity";
import useMutation from "@/hooks/requests/useMutation";
import { FieldPath, useForm } from "react-hook-form";
import { useCadastroEntidadeContext } from "../Context/CadastroEntidadeContext";

export default function useFormDadosIdentificacao() {
  const {
    informarEntidadePublica: informarDadosIdentificacao,
    dadosIdentificacao,
    id,
  } = useCadastroEntidadeContext();
  const { register, formState, handleSubmit, setError } =
    useForm<CadastroEntidade>({
      defaultValues: dadosIdentificacao,
    });

  const { nextStep } = useWizard();
  const entidadeService = useEntidadePublicaService();
  const { mutate, isLoading } = useMutation({
    mutateFn(values: CadastroEntidade) {
      return entidadeService.cadastrar(values);
    },
    options: {
      onSuccess: (data) => {
        if (!data) return;
        informarDadosIdentificacao(data.dados);
        nextStep();
      },
      onError(error) {
        if (isUnprocessableEntityError(error)) {
          error.violations.forEach((v) => {
            setError(v.propertyPath as FieldPath<CadastroEntidade>, {
              message: v.message,
            });
          });
          return;
        }
      },
    },
  });

  const salvar = (dados: CadastroEntidade) => {
    const naturezaJuridica = Number(dados.naturezaJuridica);
    mutate({ ...dadosIdentificacao, ...dados, naturezaJuridica });
  };

  const naturezas = useNaturezaJuridica();

  return {
    register,
    formState,
    submit: handleSubmit(salvar),
    isLoading,
    id,
    naturezas,
  };
}
