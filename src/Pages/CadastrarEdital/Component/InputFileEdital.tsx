import { IconTrash } from "@/Components/icons";
import Visivel from "@/Components/Visivel/Visivel";
import useFileUpload from "@/hooks/useFileUpload";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Link,
  Progress,
} from "@chakra-ui/react";
import AdicionarAnexoEditalDto from "@/data/dto/adicionar.anexo.edital.dto";
import { ArquivoResponseDto } from "@/data/dto/arquivo.response.dto";

type InputFileEditalProps = {
  isInvalid?: boolean;
  error?: string;
  field: AdicionarAnexoEditalDto;
  label?: string;
  onChange?: (data: AdicionarAnexoEditalDto, index: number) => void;
  onRemove?: (index: number) => void;
  index: number;
};
export default function InputFileEdital(props: InputFileEditalProps) {
  const { isInvalid, error, field, label, onChange, onRemove, index } = props;
  const tipoArquivo = index == 0 ? 1 : 2;
  const { onChange: onChangeUpload, progress } = useFileUpload({
    url: `${import.meta.env.VITE_FILES_URL}upload-file`,
    fieldName: "arquivo",
    substituir: true,
    onFinish(event) {
      const eventTarget = event.currentTarget as XMLHttpRequest;
      const arquivo = JSON.parse(eventTarget.response)
        .data as ArquivoResponseDto[];
      onChange?.(
        {
          arquivo: arquivo[0].id,
          link: arquivo[0].linkArquivo,
          tipoDocumento: tipoArquivo,
        },
        index
      );
    },
  });
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Visivel show={!field.arquivo}>
        <Input type="file" onChange={onChangeUpload} />
        <Progress value={progress} mt="0.5rem" />
        <FormErrorMessage>{error}</FormErrorMessage>
      </Visivel>
      <Visivel show={!!field.arquivo}>
        <Link href={field?.link} target="_blank">
          {label}.pdf
        </Link>
        <IconButton
          icon={<IconTrash />}
          aria-label="Remover edital"
          onClick={() => onRemove?.(index)}
        />
      </Visivel>
    </FormControl>
  );
}
