import { useWizard } from "@/Components/winzard/context/WizardContext";
import { usePaises } from "@/Context/MetaDadosContext";
import { CadastroFornecedor } from "@/data/dto/cadastro.fornecedor";
import { useFornecedorService } from "@/data/services/fornecedor.service";
import { isUnprocessableEntityError } from "@/hooks/requests/errors/unprocessableEntity";
import useMutation from "@/hooks/requests/useMutation";
import { useEffect } from "react";
import { FieldPath, useForm } from "react-hook-form";
import { useCadastroFornecedor } from "../Context/CadastroFornecedorContext";

export default function useFormDadosIdentificacao() {
  const { informarFornecedor, dadosIdentificacao, id } =
    useCadastroFornecedor();
  const {
    register,
    formState,
    setValue,
    clearErrors,
    watch,
    handleSubmit,
    setError,
  } = useForm<CadastroFornecedor>({
    defaultValues: dadosIdentificacao,
  });

  const { nextStep } = useWizard();
  const fornecedorService = useFornecedorService();
  const { mutate, isLoading } = useMutation({
    mutateFn(values: CadastroFornecedor) {
      return fornecedorService.cadastrar(values);
    },
    options: {
      onSuccess: (data) => {
        if (!data) return;
        informarFornecedor(data.dados);
        nextStep();
      },
      onError(error) {
        if (isUnprocessableEntityError(error)) {
          error.violations.forEach((v) => {
            setError(v.propertyPath as FieldPath<CadastroFornecedor>, {
              message: v.message,
            });
          });
          return;
        }
      },
    },
  });

  const [tipoFornecedor, isento] = watch(["tipoFornecedor", "isento"]);

  const paises = usePaises();

  const salvar = (dados: CadastroFornecedor) => {
    mutate({ ...dadosIdentificacao, ...dados });
  };

  useEffect(() => {
    if (isento) {
      setValue("inscricaoEstadual", undefined);
      clearErrors("inscricaoEstadual");
    }
  }, [isento]);

  return {
    register,
    formState,
    tipoFornecedor,
    isento,
    submit: handleSubmit(salvar),
    isLoading,
    id,
    paises,
  };
}
