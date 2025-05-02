import { useWizard } from "@/Components/winzard/context/WizardContext";
import { useCidades, useEstados } from "@/Context/MetaDadosContext";
import { EnderecoDTO } from "@/data/dto/endereco.dto";
import { useViaCep } from "@/data/services/cep.service";
import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import { isUnprocessableEntityError } from "@/hooks/requests/errors/unprocessableEntity";
import useMutation from "@/hooks/requests/useMutation";
import { FormEvent, useMemo } from "react";
import { FieldPath, useForm } from "react-hook-form";
import { useCadastroEntidadeContext } from "../Context/CadastroEntidadeContext";

export default function useFormDadosEndereco() {
  const { endereco, id, alterarPropriedade } = useCadastroEntidadeContext();
  const { nextStep } = useWizard();
  const { register, formState, watch, setValue, handleSubmit, setError } =
    useForm<EnderecoDTO>({
      defaultValues: endereco,
    });

  const viaCep = useViaCep();
  const blurCep = async (e: FormEvent<HTMLInputElement>) => {
    const zipCode = (e.target as HTMLInputElement).value.replace(/\D/g, "");
    if (zipCode.length != 8) return;
    try {
      const address = await viaCep.addressByZipCode(zipCode);
      setValue("estado", address.estado);
      setValue("bairro", address.bairro);
      setValue("logradouro", address.logradouro);
      setTimeout(() => {
        setValue("codigoIbge", address.cidadeId);
      }, 50);
    } catch {
      return;
    }
  };

  const { obterCidadesPorEstado } = useCidades();
  const estados = useEstados();
  const estado = watch("estado");

  const cidades = useMemo(() => {
    if (!estado) return [];
    return obterCidadesPorEstado(estado);
  }, [estado]);

  const entidadeService = useEntidadePublicaService();
  const { mutate, isLoading } = useMutation({
    mutateFn(values: EnderecoDTO) {
      return entidadeService.atualizarEndereco(id!, values);
    },
    options: {
      onSuccess: (data) => {
        if (data) alterarPropriedade("endereco", data.dados.endereco);
        nextStep();
      },
      onError(error) {
        if (isUnprocessableEntityError(error)) {
          error.violations.forEach((v) => {
            setError(v.propertyPath as FieldPath<EnderecoDTO>, {
              message: v.message,
            });
          });
          return;
        }
      },
    },
  });

  const salvarEndereco = (endereco: EnderecoDTO) => {
    mutate(endereco);
  };
  return {
    register,
    formState,
    estados,
    cidades,
    blurCep,
    submit: handleSubmit(salvarEndereco),
    isLoading,
  };
}
