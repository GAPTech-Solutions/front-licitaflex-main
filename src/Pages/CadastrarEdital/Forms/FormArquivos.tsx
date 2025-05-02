import ButtonSteps from "@/Components/buttons/ButtonSteps";
import { IconArrowBack } from "@/Components/icons";
import { IconCardDocumento } from "@/Components/icons/iconCardDocumento";
import ListaDocumento from "@/Components/lista/ListaDocumento";
import ListaDocumentoItem from "@/Components/lista/ListaDocumentoItem";
import {
  Flex,
} from "@chakra-ui/react";
import useFormArquivos from "./useFormArquivos";

export default function FormArquivos() {
  const {
    labelFile,
    documentosFiles,
    onChangeFile,
    isLoading,
    nextStep,
    prevStep,
  } = useFormArquivos();

  return (
    <Flex as="form" flex="1" direction="column">
      <ListaDocumento titulo="Arquivos">
        <ListaDocumentoItem
          icon={IconCardDocumento}
          documento="Edital"
          descricao="Edital do pregão eletrônico"
          arquivo={documentosFiles.edital}
          onUploadComplete={onChangeFile(1)}
        />
      </ListaDocumento>
      <ListaDocumento titulo="Arquivos Complementares">
        {documentosFiles.anexos.map((field, index) => (
          <ListaDocumentoItem
            key={index}
            icon={IconCardDocumento}
            documento={labelFile(index)}
            descricao="Arquivo complementar"
            arquivo={field}
            onUploadComplete={onChangeFile(2)}
          />
        ))}
        <ListaDocumentoItem
          icon={IconCardDocumento}
          documento={labelFile(documentosFiles.anexos.length)}
          descricao="Arquivo complementar"
          onUploadComplete={onChangeFile(2)}
        />
      </ListaDocumento>
      <Flex justifyContent="space-between">
        <ButtonSteps
          type="button"
          rightIcon={undefined}
          leftIcon={<IconArrowBack />}
          onClick={prevStep}
        >
          Voltar
        </ButtonSteps>

        <ButtonSteps type="submit" isLoading={isLoading} onClick={nextStep} />
      </Flex>
    </Flex>
  );
}
