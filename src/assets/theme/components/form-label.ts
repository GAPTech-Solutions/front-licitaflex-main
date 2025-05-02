import {
  defineStyle,
  defineStyleConfig,
  SystemStyleFunction,
} from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const baseStyle = defineStyle({
  fontSize: "md",
  marginEnd: "3",
  mb: "2",
  fontWeight: "medium",
  transitionProperty: "common",
  transitionDuration: "normal",
  opacity: 1,
  _disabled: {
    opacity: 0.4,
  },
});

const licitaflexVariant: SystemStyleFunction = (props) => ({
  fontSize: "xs",
  position: "absolute",
  left: "1rem",
  top: "0.375rem",
  textTransform: "uppercase",
  color: mode("light.7", "light.5")(props),
  zIndex: 10,
});

const chakraVariant = defineStyle({});

export const formLabelTheme = defineStyleConfig({
  variants: {
    licitaflex: licitaflexVariant,
    chakra: chakraVariant,
  },
  defaultProps: {
    variant: "licitaflex",
  },
  baseStyle,
});
