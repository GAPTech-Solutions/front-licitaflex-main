import { BoxProps, Flex } from "@chakra-ui/react";
import { IconAnexo } from "../icons/iconAnexo";
import { BallonChatAutorCss, BallonChatTextCss } from "./style";

type BallonChatProps = {
  message: string;
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
export default function BallonChatChat(props: BallonChatProps) {
  const {
    message,
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
      textAlign:
        | "center"
        | "end"
        | "justify"
        | "left"
        | "match-parent"
        | "right"
        | "start";
    }
  > = {
    voce: {
      borderRadius: "20px 20px 2px 20px",
      background: "var(--azul-2, #0C5DC1)",
      alignSelf: "flex-end",
      title: "Você",
      textAlign: "right",
    },
    pregoeiro: {
      borderRadius: "20px 20px 20px 2px",
      background: "var(--verde-2, #4CAD3F)",
      alignSelf: "flex-start",
      title: "Pregoeiro",
      textAlign: "left",
    },
    fornecedor: {
      borderRadius: "20px 20px 20px 2px",
      background: "var(--laranja-1, #F1911C)",
      alignSelf: "flex-start",
      title: "Fornecedor",
      textAlign: "left",
    },
  };
  return (
    <Flex direction="column" gap="0.5rem">
      <BallonChatTextCss
        {...restProps}
        padding="1rem"
        direction="column"
        minW="150px"
        borderRadius={showAutor ? propsBallon[autor].borderRadius : "20px"}
        background={propsBallon[autor].background}
        alignSelf={propsBallon[autor].alignSelf}
        textAlign={propsBallon[autor].textAlign}
      >
        {message}
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
