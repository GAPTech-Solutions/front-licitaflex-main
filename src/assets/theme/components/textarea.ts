import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { inputTheme } from "./input";

const baseStyle = defineStyle({
  ...inputTheme.baseStyle?.field,
  paddingY: "2",
  minHeight: "20",
  lineHeight: "short",
  verticalAlign: "top",
});

const variants = {
  outline: defineStyle(
    (props) => inputTheme.variants?.outline(props).field ?? {}
  ),
  flushed: defineStyle(
    (props) => inputTheme.variants?.flushed(props).field ?? {}
  ),
  filled: defineStyle(
    (props) => inputTheme.variants?.filled(props).field ?? {}
  ),
  unstyled: inputTheme.variants?.unstyled.field ?? {},
  form: defineStyle((props) => inputTheme.variants?.form(props).field ?? {}),
};

const sizes = {
  xs: defineStyle((props) => inputTheme.sizes?.xs(props).field ?? {}),
  sm: defineStyle((props) => inputTheme.sizes?.sm(props).field ?? {}),
  md: defineStyle((props) => inputTheme.sizes?.md(props).field ?? {}),
  lg: defineStyle((props) => inputTheme.sizes?.lg(props).field ?? {}),
};

export const textareaTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: inputTheme.defaultProps,
});
