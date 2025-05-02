import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function ContainerChat(props: PropsWithChildren) {
  return (
    <Flex direction="column" overflowY="auto" gap="1rem">
      {props.children}
    </Flex>
  );
}
