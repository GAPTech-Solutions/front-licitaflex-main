import useModal from "@/Components/Modal/Conteudo/useModal";
import { useWizard } from "@/Components/winzard/context/WizardContext";
import FornecedorRepresentante from "@/data/dto/fornecedor.representante";
import { useFornecedorService } from "@/data/services/fornecedor.service";
import { useUsuarioService } from "@/data/services/usuario.service";
import { Representante } from "@/data/types/Representante";
import { isUnprocessableEntityError } from "@/hooks/requests/errors/unprocessableEntity";
import useMutation from "@/hooks/requests/useMutation";
import useToast from "@/hooks/toast/useToast";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useCadastroFornecedor } from "../Context/CadastroFornecedorContext";
import { FormDadosRepresentanteModal } from "./FormRepresentanteLegal";

export default function useFormRepresentante() {
  const { representantes, id, alterarPropriedade } = useCadastroFornecedor();
  const { nextStep } = useWizard();
  const toast = useToast();

  const { open, props, close, openConfirm } = useModal({
    size: "2xl",
  });

  const fornecedorService = useFornecedorService();

  const closeModal = (values?: Representante) => {
    if (!values) {
      close();
      return;
    }
    toast({
      status: "success",
      description: "Representante inserido",
    });
    alterarPropriedade("representantes", [...representantes, values]);
  };

  const adicionarRepresentanteModal = () => {
    open({
      title: "Cadastrar conta bancária",
      content: {
        component: FormDadosRepresentanteModal,
        props: { close: closeModal, idFornecedor: id! },
      },
    });
  };

  const deleteRepresentante = (dado: Representante) => {
    const mutate = () => fornecedorService.deleteRepresentante(id!, dado.id);
    const message = "Confirma a exclusão do Representante?";
    const onSuccess = () => {
      const dados = representantes.filter((d) => d.id !== dado.id);
      alterarPropriedade("representantes", dados);
    };
    return { mutate, message, openConfirm, closeConfirm: close, onSuccess };
  };

  return {
    representantes,
    adicionarRepresentanteModal,
    propsModal: props,
    proximaClick: nextStep,
    deleteRepresentante,
  };
}

export type FormRepresentanteModalProps = {
  idFornecedor: string;
  close: (values?: Representante) => void;
};
export function useFormRepresentanteModal(props: FormRepresentanteModalProps) {
  const {
    register,
    formState,
    watch,
    setValue,
    handleSubmit,
    setError,
    reset,
    setFocus,
    clearErrors,
  } = useForm<FornecedorRepresentante>({});

  const idUsuario = watch("usuarioId", undefined);

  const isDisabled = idUsuario === undefined;

  const { close, idFornecedor } = props;
  const fornecedorService = useFornecedorService();

  const { mutate, isLoading } = useMutation({
    mutateFn(values: FornecedorRepresentante) {
      return fornecedorService.adicionarRepresentante(idFornecedor, values);
    },
    options: {
      onSuccess: (data) => {
        if (data) close(data.dados);
      },
      onError(error) {
        if (isUnprocessableEntityError(error)) {
          for (const v of error.violations) {
            setError(v.propertyPath as keyof FornecedorRepresentante, {
              message: v.message,
            });
          }

          return;
        }

        setError("usuarioId", { message: error.message });
      },
    },
  });

  const usuarioService = useUsuarioService();
  const blurCPF = async (e: FormEvent<HTMLInputElement>) => {
    const cpf = (e.target as HTMLInputElement).value.replace(/\D/g, "");
    if (cpf.length !== 11) return;
    try {
      const usuario = await (await usuarioService.obterUsuarioCpf(cpf)).dados;
      if (!usuario) return;
      setValue("usuarioId", usuario.id);
      setTimeout(() => {
        setFocus("tipoRepresentante");
        clearErrors();
      }, 50);
    } catch {
      reset();
      setError("root", { message: "O usuário precisa ser cadastrado!" });
      return;
    }
  };
  return {
    register,
    formState,
    blurCPF,
    submit: handleSubmit(mutate),
    isLoading,
    close,
    isDisabled,
  };
}
