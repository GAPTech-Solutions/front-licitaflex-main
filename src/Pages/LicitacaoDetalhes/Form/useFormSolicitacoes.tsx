import { ArquivoResponseDto } from "@/data/dto/arquivo.response.dto";
import { EditalSolicitacaoDto } from "@/data/dto/edital.solicitacao.dto";
import { useEditalService } from "@/data/services/edital.sevice";
import useMutation from "@/hooks/requests/useMutation";
import useFileUpload from "@/hooks/useFileUpload";
import { useForm } from "react-hook-form";

export type UseFormSolicitacoesProps = {
  close: () => void;
  tipoSolicitacao: number;
  idEdital: string;
};
export default function useFormSolicitacoes(props: UseFormSolicitacoesProps) {
  const { close, tipoSolicitacao, idEdital } = props;
  const { register, handleSubmit, setValue } = useForm<EditalSolicitacaoDto>({
    defaultValues: { tipoSolicitacao: tipoSolicitacao },
  });

  const {
    onChange: onChangeFile,
    progress: progressFile,
    inputRef,
  } = useFileUpload({
    url: `${import.meta.env.VITE_FILES_URL}upload-file`,
    pasta: "temp",
    fieldName: "arquivo",
    onFinish(event) {
      const eventTarget = event.currentTarget as XMLHttpRequest;
      const arquivo = JSON.parse(eventTarget.response)
        .data as ArquivoResponseDto[];
      setValue("arquivo", arquivo[0].id);
    },
  });
  const editalService = useEditalService();

  const { mutate, isLoading } = useMutation({
    mutateFn(values: EditalSolicitacaoDto) {
      return editalService.solicitacaoEdital(idEdital, values);
    },
    options: {
      onSuccess() {
        close();
      },
    },
  });

  return {
    register,
    submit: handleSubmit(mutate),
    isLoading,
    close,
    onChangeFile,
    progressFile,
    inputRef,
  };
}
