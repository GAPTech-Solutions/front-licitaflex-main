import { ColorModeSwitcher } from "@/Components/ColorModeSwitcher/colorModeSwitcher";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function TitleSala() {
  const [date, setDate] = useState(new Date());
  const intervalTime = useRef(-1);
  useEffect(() => {
    intervalTime.current = setInterval(() => {
      setDate(new Date());
    }, 250);
    return () => {
      clearInterval(intervalTime.current);
    };
  });

  const cronometro = date.toLocaleTimeString();

  const dateString = date.toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <Flex gap="0.5rem" alignItems="center" flex="1">
      <Flex alignItems="center" flex="1" justifyContent="center">
        <Text fontSize="12px" fontWeight="500" fontFamily="Red Hat Display">
          SALA DE DISPUTA
        </Text>
        <Text
          fontSize="20px"
          fontWeight="700"
          width="100px"
          textAlign="center"
          fontFamily="Red Hat Display"
        >
          {cronometro}
        </Text>
        <Text
          fontSize="12px"
          fontWeight="500"
          fontFamily="Red Hat Display"
          textTransform="uppercase"
        >
          {dateString}
        </Text>
      </Flex>
      <ColorModeSwitcher alignSelf="end" />
    </Flex>
  );
}
