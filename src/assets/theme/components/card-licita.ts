import { cardLicitaAnatomy } from "@/Components/anatomy/components-custom";
import { defineCssVars } from "@chakra-ui/react";
import {
  createMultiStyleConfigHelpers,
} from "@chakra-ui/styled-system";
import { transparentize } from "@chakra-ui/theme-tools";

const vars = defineCssVars("badge", ["bg", "color", "shadow"]);

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardLicitaAnatomy.keys);

const baseStyle = definePartsStyle({
  
    container: {
      display: "flex",
      position: "relative",
      border: "1px solid",
      borderColor: "light.4",
      padding: "2rem 2rem 1rem 2rem",
      borderRadius: "6px"
    },
    badge: {
      position: "absolute",      
      borderRadius: "6px 3px 3px 0",
      top: "-1px",
      left: "-1px",
      padding: "4px",      
      paddingInlineStart:"2rem",
      px: 1,
      textTransform: "uppercase",
      fontSize: "xs",
      fontWeight: "bold",
      bg: vars.bg.reference,
      color: vars.color.reference,
      boxShadow: vars.shadow.reference,
    },  
});

const variantDefault = definePartsStyle((props) => {
  const { colorScheme: c, theme } = props;
  const dark = transparentize(`${c}.500`, 0.6)(theme);
  return {
    container: {},
    badge: {
      [vars.bg.variable]: `colors.${c}.500`,
      [vars.color.variable]: `colors.white`,
      _dark: {
        [vars.bg.variable]: dark,
        [vars.color.variable]: `colors.whiteAlpha.800`,
      },
    },
  };
});

// const size = {
//   lg: defineStyle({
//     fontSize: "lg",
//     px: "4",
//     h: "12",
//     borderRadius: "md",
//   }),
//   md: defineStyle({
//     fontSize: "md",
//     px: "4",
//     h: "10",
//     borderRadius: "md",
//   }),
//   sm: defineStyle({
//     fontSize: "sm",
//     px: "3",
//     h: "8",
//     borderRadius: "sm",
//   }),
//   xs: defineStyle({
//     fontSize: "xs",
//     px: "2",
//     h: "6",
//     borderRadius: "sm",
//   }),
// };

// const sizes = {
//   lg: definePartsStyle({
//     container: size.lg,
//     badge: size.lg,
//   }),
//   md: definePartsStyle({
//     container: size.md,
//     badge: size.md,
//   }),
//   sm: definePartsStyle({
//     container: size.sm,
//     badge: size.sm,
//   }),
//   xs: definePartsStyle({
//     container: size.xs,
//     badge: size.xs,
//   }),
// };

export const cardLicitaTheme = defineMultiStyleConfig({
  baseStyle,  
  variants: { default: variantDefault },  
  defaultProps: {
    size: "md",
    variant: "default",
    colorScheme: "gray"
  },
});
