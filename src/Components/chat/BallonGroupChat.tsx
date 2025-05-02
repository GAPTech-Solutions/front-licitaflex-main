import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { BallonGroupChatCss } from "./style";

type BallonGroupChatProps = {} & PropsWithChildren;
export default function BallonGroupChat(props: BallonGroupChatProps) {
  return (
    <BallonGroupChatCss direction="column" gap="0.5rem">
      {props.children}
    </BallonGroupChatCss>
  );
}
