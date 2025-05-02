import { useAuth } from "@/Context/AuthContext";
import RegistroUsuario from "@/data/dto/registro.usuario";
import { useRegistroService } from "@/data/services/registro.service";
import { ResponseApi } from "@/data/types/ResponseApi";
import { Usuario } from "@/data/types/Usuario";
import { isUnprocessableEntityError } from "@/hooks/requests/errors/unprocessableEntity";
import useMutation from "@/hooks/requests/useMutation";
import useToast from "@/hooks/toast/useToast";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";

import { FieldPath, useForm } from "react-hook-form";

export default function useRegistroUsuario() {
  const { register, formState, handleSubmit, setError, getValues } =
    useForm<RegistroUsuario>();

  const { login } = useAuth();
  const toast = useToast();

  const { navigate } = useNavigateLicitaFlex();

  const registroService = useRegistroService();

  const { mutate, isLoading } = useMutation<
    RegistroUsuario,
    ResponseApi<Usuario>
  >({
    mutateFn(values) {
      return registroService.registrar(values);
    },
    options: {
      onError(error) {
        if (isUnprocessableEntityError(error)) {
          error.violations.forEach((v) => {
            setError(v.propertyPath as FieldPath<RegistroUsuario>, {
              message: v.message,
            });
          });
          return;
        }
        toast({
          title: error.message,
          status: "error",
        });
      },
      async onSuccess(data) {
        toast({
          title: data?.menssagem,
          status: "success",
        });
        if (!data) return;
        await login(data.dados.email, getValues("password"));
        setTimeout(() => {
          navigate("cadastro-plataforma-concluido");
        }, 50);
      },
    },
  });

  const registroSubmit = handleSubmit(mutate);

  return { register, formState, registroSubmit, isLoading };
}
