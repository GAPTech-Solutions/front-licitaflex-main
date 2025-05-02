import ButtonSteps from "@/Components/buttons/ButtonSteps";
import { IconCardCpnj } from "@/Components/icons/iconCardCpnj";
import { IconCardDocumento } from "@/Components/icons/iconCardDocumento";
import { IconCardUsuario } from "@/Components/icons/iconCardUsuario";
import ListaDocumento from "@/Components/lista/ListaDocumento";
import ListaDocumentoItem from "@/Components/lista/ListaDocumentoItem";
import useFormDocumentos from "./useFormDocumentos";

export default function FormDocumentos() {
  const { uploadDocumento, documentosForm, camposRepresentante } =
    useFormDocumentos();
  return (
    <>
      <ListaDocumento titulo="FORNECEDOR">
        <ListaDocumentoItem
          icon={IconCardCpnj}
          documento="CNPJ"
          descricao="Arquivo pdf do cartão escaneado"
          onUploadComplete={uploadDocumento(101, documentosForm.cnpj?.id)}
          arquivo={documentosForm.cnpj?.documento}
        />
        <ListaDocumentoItem
          icon={IconCardDocumento}
          documento="contrato social"
          descricao="Arquivo pdf do documento escaneado"
          onUploadComplete={uploadDocumento(102, documentosForm.contrato?.id)}
          arquivo={documentosForm.contrato?.documento}
        />
        <ListaDocumentoItem
          icon={IconCardUsuario}
          documento="identificação do admnistrador"
          descricao="Arquivo pdf da carteira de identidade escaneada"
          onUploadComplete={uploadDocumento(
            103,
            documentosForm.administrador?.id
          )}
          arquivo={documentosForm.administrador?.documento}
        />
      </ListaDocumento>
      <ListaDocumento titulo="Representantes">
        {camposRepresentante.map((cr) => (
          <ListaDocumentoItem
            key={cr.descricao}
            icon={IconCardUsuario}
            documento={cr.documento}
            descricao={`Documento pessoal de ${cr.descricao}`}
            onUploadComplete={uploadDocumento(
              104,
              cr.arquivo?.id,
              cr.idRepresentante
            )}
            arquivo={cr.arquivo?.documento}
          />
        ))}
      </ListaDocumento>
      <ButtonSteps>Enviar para Avaliação</ButtonSteps>
    </>
  );
}
