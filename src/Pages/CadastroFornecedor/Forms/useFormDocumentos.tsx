import AdicionarDocumentoFornecedorDto from "@/data/dto/adicionar.documento.fornecedor.dto";
import { ArquivoResponseDto } from "@/data/dto/arquivo.response.dto";
import { useFornecedorService } from "@/data/services/fornecedor.service";
import useMutation from "@/hooks/requests/useMutation";
import { useMemo } from "react";
import { useCadastroFornecedor } from "../Context/CadastroFornecedorContext";

export default function useFormDocumentos() {
  const { documentos, representantes, id, alterarPropriedade } =
    useCadastroFornecedor();

  const fornecedorService = useFornecedorService();
  const { mutate, isLoading } = useMutation({
    mutateFn(values: AdicionarDocumentoFornecedorDto) {
      return fornecedorService.adicionarDocumento(id!, values);
    },
    options: {
      onSuccess: (data) => {
        if (data)
          alterarPropriedade("documentos", [
            ...documentos.filter((d) => d.id !== data.dados.id),
            data.dados,
          ]);
      },
    },
  });

  const uploadDocumento = (
    tipoDocumento: number,
    idDocumento?: string,
    idRepresentante?: string
  ) => {
    return (documento: ArquivoResponseDto) => {
      mutate({
        id: idDocumento,
        arquivo: documento.id,
        tipoDocumento: tipoDocumento,
        idRepresentante: idRepresentante,
      });
    };
  };

  const documentosForm = useMemo(() => {
    const cnpj = documentos.find((d) => d.documento.tipoDocumento === 101);
    const contrato = documentos.find((d) => d.documento.tipoDocumento === 102);
    const administrador = documentos.find(
      (d) => d.documento.tipoDocumento === 103
    );
    return { cnpj, contrato, administrador };
  }, [documentos]);

  const camposRepresentante = useMemo(() => {
    return representantes.map((r) => ({
      documento: r.tipoRepresentante === 2 ? "Procuração" : "Documento Pessoal",
      descricao: r.nome,
      arquivo: documentos.find(
        (d) => d.documento.tipoDocumento === 104 && d.representanteId === r.id
      ),
      idRepresentante: r.id,
    }));
  }, [representantes, documentos]);
  return {
    isLoading,
    uploadDocumento,
    documentosForm,
    camposRepresentante,
  };
}
