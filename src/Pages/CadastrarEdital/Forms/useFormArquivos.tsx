import { useWizard } from "@/Components/winzard/context/WizardContext";
import AdicionarAnexoEditalDto from "@/data/dto/adicionar.anexo.edital.dto";
import { ArquivoResponseDto } from "@/data/dto/arquivo.response.dto";
import { CadastroEditalDto } from "@/data/dto/cadastro.edital";
import { useEditalService } from "@/data/services/edital.sevice";
import { Documento } from "@/data/types/Documento";
import useMutation from "@/hooks/requests/useMutation";
import { useMemo } from "react";

export default function useFormArquivos() {
  const {
    setData,
    wizard: { data },
    nextStep,
    prevStep,
  } = useWizard<CadastroEditalDto>();

  const serviceEdital = useEditalService();
  const { mutate, isLoading } = useMutation({
    async mutateFn(values: AdicionarAnexoEditalDto) {
      return serviceEdital.adicionarAnexo(data?.id!, values);
    },
    options: {
      onSuccess(dadosRequest) {
        if (!dadosRequest?.dados) return;
        setData({
          documentos: [...(data?.documentos ?? []), dadosRequest.dados],
        });
      },
    },
  });

  const onChangeFile = (tipoArquivo: number) => {
    return (data: ArquivoResponseDto) =>
      mutate({
        arquivo: data.id,
        link: data.linkArquivo,
        tipoDocumento: tipoArquivo,
      });
  };

  // const removeFile = (index: number) => {
  //   remove(index);
  // };

  const documentosFiles = useMemo(() => {
    const edital = data?.documentos?.find(
      (d) => d.tipoDocumento == 1
    ) as Documento;
    const anexos = (data?.documentos?.filter((d) => d.tipoDocumento != 1) ??
      []) as Documento[];

    return { edital, anexos };
  }, [data?.documentos]);

  const labelFile = (index: number) => {
    const sequencia = index + 1;
    return `Anexo - ${sequencia}`;
  };

  return {
    documentosFiles,
    labelFile,
    onChangeFile,
    isLoading,
    nextStep,
    prevStep,
  };
}
