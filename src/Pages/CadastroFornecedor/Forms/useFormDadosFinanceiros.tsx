import useModal from "@/Components/Modal/Conteudo/useModal";
import { useWizard } from "@/Components/winzard/context/WizardContext";
import { useBancos } from "@/Context/MetaDadosContext";
import { DadosFinanceiroDto } from "@/data/dto/dados.financeiro";
import { useFornecedorService } from "@/data/services/fornecedor.service";
import DadosFinanceiro from "@/data/types/DadosFinanceiro";
import { isUnprocessableEntityError } from "@/hooks/requests/errors/unprocessableEntity";
import useMutation from "@/hooks/requests/useMutation";
import { FieldPath, useForm } from "react-hook-form";
import { useCadastroFornecedor } from "../Context/CadastroFornecedorContext";
import { FormDadosFinanceiroModal } from "./FormDadosFinanceiros";

export default function useFormDadosFinanceiros() {
  const { dadosFinanceiros, id, adicionarDadosFinanceiro, alterarPropriedade } =
    useCadastroFornecedor();
  const { nextStep } = useWizard();
  const { register, formState, handleSubmit, setError, reset } =
    useForm<DadosFinanceiroDto>({});

  const { open, props, close, openConfirm } = useModal({
    size: "2xl",
  });

  const bancos = useBancos();

  const fornecedorService = useFornecedorService();
  const { mutate, isLoading } = useMutation({
    mutateFn(values: DadosFinanceiroDto) {
      return fornecedorService.adicionarDadoFinanceiro(id!, values);
    },
    options: {
      onSuccess: (data) => {
        if (data) adicionarDadosFinanceiro(data.dados);
        reset();
        close();
      },
      onError(error) {
        if (isUnprocessableEntityError(error)) {
          error.violations.forEach((v) => {
            setError(v.propertyPath as FieldPath<DadosFinanceiroDto>, {
              message: v.message,
            });
          });
          return;
        }
      },
    },
  });

  const salvarDadosFinanceiro = (dados: DadosFinanceiroDto) => {
    mutate(dados);
  };

  const adicionarConta = () => {
    open({
      title: "Cadastrar conta bancária",
      content: {
        component: FormDadosFinanceiroModal,
        props: {
          bancos: bancos,
          isLoading: isLoading,
          register,
          submit: handleSubmit(salvarDadosFinanceiro),
          close,
        },
      },
    });
  };

  const deleteConta = (dado: DadosFinanceiro) => {
    const mutate = () => fornecedorService.deleteDadoFinanceiro(id!, dado.id);
    const message = "Confirma a exclusão do Dado Financeiro?";
    const onSuccess = () => {
      const dados = dadosFinanceiros.filter((d) => d.id !== dado.id);
      alterarPropriedade("dadosFinanceiros", dados);
    };
    return { mutate, message, openConfirm, closeConfirm: close, onSuccess };
  };

  return {
    dadosFinanceiros,
    propsModal: props,
    adicionarConta,
    deleteConta,
    proximaClick: nextStep,
    formState,
  };
}
