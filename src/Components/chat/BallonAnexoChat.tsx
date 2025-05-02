import { BoxProps, Flex } from "@chakra-ui/react";
import { IconAnexo } from "../icons/iconAnexo";
import { BallonChatAutorCss, BallonChatTextCss } from "./style";
import { date } from "yup";
import { Documento } from "@/data/types/Documento";
import ButtonFile from "../buttons/ButtonFile";

type BallonChatProps = {
  documento: Documento;
  myMessage?: boolean;
  dateTime?: string | Date;
  autor?: "voce" | "pregoeiro" | "fornecedor";
  autorName?: string;
  alignSelf?: "flex-end" | "flex-start";
  showAutor?: boolean;
} & BoxProps;
function formatDateTime(dateTime: string | Date) {
  let date: Date;
  if (typeof dateTime == "string") {
    date = new Date(dateTime);
  } else {
    date = dateTime;
  }
  return `${date.toStringPtBr({
    day: "2-digit",
    month: "2-digit",
  })} | ${date.toTimeStringPtBr()}`;
}
export default function BallonAnexoChat(props: BallonChatProps) {
  const {
    documento,
    dateTime = new Date(),
    autor = props.myMessage ? "voce" : "pregoeiro",
    autorName,
    showAutor = true,
    myMessage,
    ...restProps
  } = props;

  const dateFormated = formatDateTime(dateTime);
  const propsBallon: Record<
    "voce" | "pregoeiro" | "fornecedor",
    {
      borderRadius: string;
      background: string;
      alignSelf: string;
      title: string;
    }
  > = {
    voce: {
      borderRadius: "20px 20px 2px 20px",
      background: "var(--azul-2, #0C5DC1)",
      alignSelf: "flex-end",
      title: "Você",
    },
    pregoeiro: {
      borderRadius: "20px 20px 20px 2px",
      background: "var(--verde-2, #4CAD3F)",
      alignSelf: "flex-start",
      title: "Pregoeiro",
    },
    fornecedor: {
      borderRadius: "20px 20px 20px 2px",
      background: "var(--laranja-1, #F1911C)",
      alignSelf: "flex-start",
      title: "Fornecedor",
    },
  };
  return (
    <Flex direction="column" gap="0.5rem">
      <BallonChatTextCss
        {...restProps}
        padding="1rem"
        direction="column"
        borderRadius={showAutor ? propsBallon[autor].borderRadius : "20px"}
        background={propsBallon[autor].background}
        alignSelf={propsBallon[autor].alignSelf}
      >
        <ButtonFile
          arquivo={documento.nomeOriginal}
          tamanho={documento.tamanho}
          link={documento.caminho}
          ext="pdf"
          aria-label="Arquivo"
          background=""
        />
      </BallonChatTextCss>
      {showAutor && (
        <BallonChatAutorCss
          alignSelf={propsBallon[autor].alignSelf}
          gap="0.5rem"
        >
          <div>
            <IconAnexo />
            {autorName || propsBallon[autor].title}
          </div>
          <span>{dateFormated}</span>
        </BallonChatAutorCss>
      )}
    </Flex>
  );
}
