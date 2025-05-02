import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { getColor, mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

const size = {
  lg: defineStyle((props) => {
    return {
      fontSize: "lg",
      px: "5",
      h: props.variant == "form" ? "16" : "12",
      borderRadius: "lg",
    };
  }),
  md: defineStyle((props) => {
    return {
      fontSize: "md",
      px: "4",
      h: props.variant == "form" ? "14" : "10",
      borderRadius: "md",
    };
  }),
  sm: defineStyle((props) => {
    return {
      fontSize: "sm",
      px: "3",
      h: props.variant == "form" ? "10" : "8",
      borderRadius: "sm",
    };
  }),
  xs: defineStyle((props) => ({
    fontSize: "xs",
    px: "2",
    h: props.variant == "form" ? "8" : "6",
    borderRadius: "xs",
  })),
};

const sizes = {
  lg: definePartsStyle((props) => ({
    field: size.lg(props),
    addon: size.lg(props),
  })),
  md: definePartsStyle((props) => {
    return { field: size.md(props), addon: size.md(props) };
  }),
  sm: definePartsStyle((props) => {
    return {
      field: size.sm(props),
      addon: size.sm(props),
    };
  }),
  xs: definePartsStyle((props) => ({
    field: size.xs(props),
    addon: size.xs(props),
  })),
};

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  };
}

const variantOutline = definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  };
});

const variantOutlineForm = definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: "1px solid",
      borderColor: "inherit",
      bg: "inherit",
      height: "auto",
      padding: "1.5rem 1rem 0.5rem 1rem",
      fontWeight: 500,
      color: mode("dark.6", "light.2")(props),
      _hover: {
        borderColor: mode("gray.300", "whiteAlpha.400")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  };
});

const variantFilled = definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
      _hover: {
        bg: mode("gray.200", "whiteAlpha.100")(props),
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
      },
      _focusVisible: {
        bg: "transparent",
        borderColor: getColor(theme, fc),
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "transparent",
      bg: mode("gray.100", "whiteAlpha.50")(props),
    },
  };
});

const variantFlushed = definePartsStyle((props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      borderBottom: "1px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`,
      },
      _focusVisible: {
        borderColor: getColor(theme, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      borderBottom: "2px solid",
      borderColor: "inherit",
      borderRadius: "0",
      px: "0",
      bg: "transparent",
    },
  };
});

const variantUnstyled = definePartsStyle({
  field: {
    bg: "transparent",
    px: "0",
    height: "auto",
  },
  addon: {
    bg: "transparent",
    px: "0",
    height: "auto",
  },
});

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled,
  form: variantOutlineForm,
};

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: "md",
    variant: "form",
  },
});
