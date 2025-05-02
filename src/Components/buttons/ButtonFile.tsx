import {
  Box,
  ComponentWithAs,
  Flex,
  IconButton,
  IconButtonProps,
  Text,
} from "@chakra-ui/react";
import { IconApplication, IconProps } from "../icons";
import { IconBaixar } from "../icons/iconBaixar";
import { IconPDF } from "../icons/extensions/iconPDF";
import { IconDOC } from "../icons/extensions/iconDOC";
import { IconImage } from "../icons/extensions/iconImage";
import { IconXLS } from "../icons/extensions/iconXLS";
import { IconZIP } from "../icons/extensions/iconZIP";

type ButtonFileProps = {
  arquivo: string;
  ext: string;
  tamanho: number;
  background?: string;
  link?: string;
} & IconButtonProps;

function converteKb(numero: number) {
  return Math.round(numero / 1024);
}

function getExtension(filename: string) {
  const extension = filename.split(".").pop();

  return extension?.toLowerCase() ?? "default";
}
export default function ButtonFile(props: ButtonFileProps) {
  const {
    arquivo,
    ext,
    tamanho,
    background = "gray.500",
    link,
    color,
    ...propsRest
  } = props;

  const icons: Record<string, ComponentWithAs<"svg", IconProps>> = {
    pdf: IconPDF,
    doc: IconDOC,
    image: IconImage,
    xls: IconXLS,
    zip: IconZIP,
  };
  const extension = getExtension(arquivo);
  const IconFile = icons[extension] ?? IconImage;
  return (
    <Flex
      justifyContent="space-between"
      bg={background}
      padding="1rem"
      alignItems="center"
      gap="1rem"
      borderRadius="0.5rem"
      color={color}
    >
      <Flex alignItems="center" gap="1rem">
        <IconFile height="32px" width="32px" />
        <Flex direction="column">
          <Text fontWeight="bold">{arquivo}</Text>
          <Text>Anexo | {converteKb(tamanho)} KB</Text>
        </Flex>
      </Flex>
      {link && (
        <IconButton
          {...propsRest}
          as="a"
          href={link}
          download={arquivo}
          target="_blank"
          variant="ghost"
          icon={<IconBaixar />}
          aria-label="download do arquivo"
        />
      )}
    </Flex>
  );
}
