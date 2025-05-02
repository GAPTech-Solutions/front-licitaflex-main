import { useWizard } from "@/Components/winzard/context/WizardContext";
import { CadastroEditalDto } from "@/data/dto/cadastro.edital";
import { useForm } from "react-hook-form";

export default function useFormDefinicoes() {
  const {
    setData,
    wizard: { data },
    nextStep,
    prevStep,
  } = useWizard<CadastroEditalDto>();

  const { register, handleSubmit, formState } = useForm<CadastroEditalDto>({
    defaultValues: { ...data },
  });

  const salvarEtapa = (dados: CadastroEditalDto) => {
    setData({ ...data, ...dados });
    nextStep();
  };
  return { register, submit: handleSubmit(salvarEtapa), formState, prevStep };
}
