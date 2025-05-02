import { useWizard } from "@/Components/winzard/context/WizardContext";
import ParticiparFornecedorDto from "@/data/dto/participar.forncedor.dto";
import { useForm } from "react-hook-form";

type FormDeclaracaoValues = Omit<
  ParticiparFornecedorDto,
  "documentos" | "lotes"
>;
export default function useFormDeclaracao() {
  const {
    nextStep,
    setData,
    wizard: { data },
  } = useWizard<ParticiparFornecedorDto>();

  const { register, handleSubmit, formState } = useForm<FormDeclaracaoValues>({
    defaultValues: data,
  });

  const salvar = (values: FormDeclaracaoValues) => {
    setData(values);
    nextStep();
  };
  return { register, submit: handleSubmit(salvar), formState };
}
