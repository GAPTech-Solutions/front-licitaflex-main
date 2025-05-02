import { useWizard } from "@/Components/winzard/context/WizardContext";
import { CadastroEditalDto } from "@/data/dto/cadastro.edital";
import { useForm } from "react-hook-form";

export default function useFormRegistroPreco() {
  const {
    setData,
    wizard: { data },
    nextStep,
    prevStep,
  } = useWizard<CadastroEditalDto>();

  const { register, handleSubmit, formState, watch } =
    useForm<CadastroEditalDto>({
      defaultValues: {
        ...data,
        convenio: data?.registroPreco ?? false,
        permitidoCarona: data?.permitidoCarona ?? false,
      },
    });

  const registroPreco = watch("registroPreco");

  const salvarEtapa = (dados: CadastroEditalDto) => {
    setData({ ...data, ...dados });
    nextStep();
  };
  return {
    register,
    submit: handleSubmit(salvarEtapa),
    prevStep,
    formState,
    registroPreco,
  };
}
