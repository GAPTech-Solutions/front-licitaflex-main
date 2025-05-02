import { useAuth } from "@/Context/AuthContext";
import LoginUsuario from "@/data/dto/login.usuario";
import useMutation from "@/hooks/requests/useMutation";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";

import { useForm } from "react-hook-form";

export default function useLogin() {
  const { register, formState, handleSubmit, setError } =
    useForm<LoginUsuario>();

  const { navigate, link } = useNavigateLicitaFlex();

  const auth = useAuth();

  const { mutate, isLoading } = useMutation<LoginUsuario, Boolean>({
    mutateFn(values) {
      return auth.login(values.email, values.password);
    },
    options: {
      onSuccess(data) {
        if (data) {
          setTimeout(() => {
            navigate("inicio");
          }, 100);
          return;
        }
        setError("root", { message: "E-mail ou senha inválida!" });
      },
    },
  });

  const registroSubmit = handleSubmit(mutate);

  return {
    register,
    formState,
    registroSubmit,
    isLoading,
    linkCadastro: link("cadastro-plataforma"),
  };
}
