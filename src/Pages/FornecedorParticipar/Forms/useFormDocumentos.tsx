import { useWizard } from "@/Components/winzard/context/WizardContext";
import { ArquivoResponseDto } from "@/data/dto/arquivo.response.dto";
import ParticiparFornecedorDto from "@/data/dto/participar.forncedor.dto";
import { useEditalService } from "@/data/services/edital.sevice";
import useMutation from "@/hooks/requests/useMutation";
import useToast from "@/hooks/toast/useToast";
import useFileUpload from "@/hooks/useFileUpload";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import { useParams } from "react-router-dom";

export default function useFormDocumentos() {
  const { idEdital } = useParams();
  const toast = useToast();
  const { navigate } = useNavigateLicitaFlex();

  const {
    setData,
    wizard: { data },
  } = useWizard<ParticiparFornecedorDto>();

  const { onChange, progress, inputRef } = useFileUpload({
    url: `${import.meta.env.VITE_FILES_URL}upload-file`,
    pasta: "temp",
    fieldName: "arquivo",
    onFinish(event) {
      const eventTarget = event.currentTarget as XMLHttpRequest;
      const arquivo = JSON.parse(eventTarget.response)
        .data as ArquivoResponseDto[];

      const arquivoDados = arquivo.map((d) => ({
        arquivo: d.id,
        tipoDocumento: 2,
        link: d.linkArquivo,
        nomeArquivo: d.nome,
      }));
      setData({
        documentos: [...(data?.documentos ?? []), ...arquivoDados],
      });
    },
  });

  const editalService = useEditalService();
  const { isLoading, mutate } = useMutation({
    mutateFn(values: ParticiparFornecedorDto) {
      return editalService.participarEdital(idEdital!, values);
    },
    options: {
      onSuccess: (data) => {
        setData({
          ...data?.dados,
          documentos: data?.dados.documentos.map((d) => ({
            arquivo: d.nome,
            tipoDocumento: d.tipoDocumento,
            link: d.caminho,
            nomeArquivo: d.nomeOriginal,
          })),
          lotes: data?.dados.items.map((i) => ({
            descricao: i.descricao,
            fabricante: i.fabricante,
            itemId: i.itemId,
            marca: i.marca,
            valor: i.valor,
            modeloVersao: i.modeloVersao,
          })),
        });
        toast({
          title: "Licitaflex",
          description: "Proposta enviada!",
          status: "success",
        });
        navigate("visualizar-licitacao", { idEdital: idEdital! });
      },
    },
  });

  return {
    onChange,
    onSave: () => mutate(data as ParticiparFornecedorDto),
    progress,
    documentos: data?.documentos ?? [],
    inputRef,
    isLoading,
  };
}
