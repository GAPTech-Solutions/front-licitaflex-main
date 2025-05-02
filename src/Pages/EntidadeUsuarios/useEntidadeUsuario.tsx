import AdicionarUsuarioEntidadeDto from "@/data/dto/adicionar.usuario.entidade.dto";
import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import { useUsuarioService } from "@/data/services/usuario.service";
import useMutation from "@/hooks/requests/useMutation";
import useQuery from "@/hooks/requests/useQuery";
import useToast from "@/hooks/toast/useToast";

import validateCPF from "@/utils/validation/cpf";
import { useForm } from "react-hook-form";

export default function useEntidadeUsuario() {
  const entidadeService = useEntidadePublicaService();
  const usuarioService = useUsuarioService();
  const toast = useToast();

  const { formState, register, handleSubmit, reset } =
    useForm<AdicionarUsuarioEntidadeDto>({
      mode: "onChange",
    });
  const { data, isLoading, reFetch } = useQuery({
    fetchFn: async () => (await entidadeService.usuarios()).dados,
  });

  const { mutate, isLoading: isLoadingSave } = useMutation<
    AdicionarUsuarioEntidadeDto,
    any
  >({
    mutateFn(values) {
      return entidadeService.adicionarUsuario(values);
    },
    options: {
      onSuccess: () => {
        reFetch();
        reset();
      },
      onError(error) {
        toast({
          title: "Erro",
          description: error.message,
          status: "error",
        });
      },
    },
  });

  const validateCPFAsync = async (value?: string) => {
    if (!value) return undefined;
    const validadeValue = validateCPF(value);
    if (validadeValue !== true) return validadeValue;
    try {
      const usuario = (await usuarioService.existeUsuarioCpf(value)).dados;
      if (!usuario) return "Usuário deve possuir cadastro na plataforma!";
      return true;
    } catch (error) {
      return "Usuário deve possuir cadastro na plataforma!";
    }
  };

  const salvar = (values: AdicionarUsuarioEntidadeDto) => {
    mutate(values);
  };
  const isLoadingForm = isLoading || isLoadingSave;
  return {
    usuarios: data,
    isLoading: isLoadingForm,
    formState,
    register,
    validateCPFAsync,
    submit: handleSubmit(salvar),
  };
}
