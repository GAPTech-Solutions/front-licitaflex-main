import { ArquivoResponseDto } from "@/data/dto/arquivo.response.dto";
import { EditalSolicitacaoDto } from "@/data/dto/edital.solicitacao.dto";
import { useEditalService } from "@/data/services/edital.sevice";
import { Solicitacoes } from "@/data/types/Solicitacoes";
import useMutation from "@/hooks/requests/useMutation";
import useFileUpload from "@/hooks/useFileUpload";
import { useForm } from "react-hook-form";

export type useFormRepostaSolicitacoesProps = {
  close: () => void;
  idEdital: string;
  solicitacao: Solicitacoes;
};
export default function useFormRepostaSolicitacoes(
  props: useFormRepostaSolicitacoesProps
) {
  const { close, solicitacao, idEdital } = props;
  const { register, handleSubmit, setValue } = useForm<EditalSolicitacaoDto>({
    defaultValues: { tipoSolicitacao: solicitacao.tipoSolicitacao },
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
      return editalService.respostasolicitacaoEdital(
        idEdital,
        solicitacao.id,
        values
      );
    },
    options: {
      onSuccess(data) {
        if (data) {
          solicitacao.dataResposta = data.dados.dataResposta;
          solicitacao.ouvidor = data.dados.ouvidor;
          solicitacao.resposta = data.dados.resposta;
          solicitacao.documentoResposta = data.dados.documentoResposta;
        }
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
