import { Box, BoxProps, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type LabelTextProps = {
  label: string;
  prefixo?: string;
} & PropsWithChildren &
  BoxProps;
export default function LabelText(props: LabelTextProps) {
  const { label, prefixo, children, ...rest } = props;
  return (
    <Box {...rest}>
      <Text fontSize="12px" fontWeight="500">
        {label}
      </Text>

      <Text fontSize="14px" fontWeight="700">
        {prefixo}
        {children}
      </Text>
    </Box>
  );
}
