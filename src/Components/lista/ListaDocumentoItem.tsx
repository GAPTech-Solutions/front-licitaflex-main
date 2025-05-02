import { ArquivoResponseDto } from "@/data/dto/arquivo.response.dto";
import useFileUpload from "@/hooks/useFileUpload";
import {
  Box,
  Button,
  ComponentWithAs,
  Flex,
  IconButton,
  IconProps,
  Input,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Tag,
  Text,
} from "@chakra-ui/react";
import { IconAnexo } from "../icons/iconAnexo";
import { IconInfo2 } from "../icons/iconInfo2";
import Visivel from "../Visivel/Visivel";
import { Documento } from "@/data/types/Documento";
type ListaDocumentoItemProps = {
  icon: ComponentWithAs<"svg", IconProps>;
  documento?: string;
  descricao?: string;
  status?: number;
  arquivo?: Documento;
  onUploadComplete?: (arquivo: ArquivoResponseDto) => void;
};

export default function ListaDocumentoItem(props: ListaDocumentoItemProps) {
  const {
    icon: Icon,
    documento,
    descricao,
    status,
    arquivo,
    onUploadComplete,
  } = props;

  const { onChange, inputRef, progress } = useFileUpload({
    url: `${import.meta.env.VITE_FILES_URL}upload-file`,
    fieldName: "arquivo",
    substituir: true,
    onFinish(event) {
      const eventTarget = event.currentTarget as XMLHttpRequest;
      const arquivo = JSON.parse(eventTarget.response)
        .data as ArquivoResponseDto[];
      if (arquivo.length > 0) {
        onUploadComplete?.(arquivo[0]);
      }
    },
  });
  const clickAnexo = () => {
    inputRef.current?.click();
  };

  const textButton = arquivo ? "Editar" : "Anexar";
  return (
    <Flex alignItems="center" justifyContent="space-between" width="100%">
      <Input type="file" display="none" ref={inputRef} onChange={onChange} />
      <Flex flex="4" gap="10px">
        <Icon width="auto" height="36px" />
        <Box alignSelf="flex-start">
          <Text
            fontSize="1rem"
            lineHeight="20px"
            fontWeight="700"
            textTransform="uppercase"
          >
            {documento}
          </Text>
          <Text
            fontSize="12px"
            lineHeight="18px"
            textTransform="uppercase"
            fontWeight="500"
          >
            {descricao}
          </Text>
        </Box>
      </Flex>
      <Flex flex="2" gap="1rem">
        <Button
          leftIcon={<IconAnexo width="auto" height="20px" />}
          aria-label="Adicionar Documento"
          variant="link"
          colorScheme="azul"
          onClick={clickAnexo}
        >
          {textButton}
        </Button>
      </Flex>
      <Flex flex="2">
        <Visivel show={progress > 0}>
          <Flex direction="column" minW="100px">
            <Progress value={progress} />
          </Flex>
        </Visivel>
        <Visivel show={!!status && progress === 0}>
          <Flex direction="column">
            <Tag>Validado</Tag>
          </Flex>
        </Visivel>
      </Flex>
      <Flex>
        <Popover>
          <PopoverTrigger>
            <IconButton
              icon={<IconInfo2 width="auto" height="20px" />}
              aria-label="Adicionar Documento"
              variant="link"
              colorScheme="azul"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader display="flex" gap="0.5rem">
              <IconInfo2 width="auto" height="20px" />
              <Text>Detalhes</Text>
            </PopoverHeader>
            <PopoverBody>
              <Link
                marginLeft="0.5rem"
                target="_blank"
                href={arquivo?.caminho}
                color="azul.2"
                textTransform="none"
              >
                {arquivo?.nomeOriginal}
              </Link>
            </PopoverBody>
            <PopoverFooter as={Flex}>
              <Flex direction="column">
                <Text>Anexado</Text>
                <Text>{arquivo?.createdAt}</Text>
              </Flex>
              <Flex direction="column">
                <Text>Anexado</Text>
                <Text>{arquivo?.createdAt}</Text>
              </Flex>
              <Flex direction="column">
                <Text>Anexado</Text>
                <Text>{arquivo?.createdAt}</Text>
              </Flex>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
}
