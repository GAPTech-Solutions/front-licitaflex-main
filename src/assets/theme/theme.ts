import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { Dict } from "@chakra-ui/utils";
import { mode } from "@chakra-ui/theme-tools";
import { semanticTokens } from "./semanticTokens";
import components from "./components";
const theme = extendTheme({
  config: { cssVarPrefix: "licita-flex" },
  fonts: {
    heading: `'Red Hat Display', 'sans-serif'`,
    body: `'Inter', 'sans-serif'`,
  },
  styles: {
    global: (props: Dict) => ({
      "html,body": {
        bg: mode("light.2", "dark.3")(props),
        color: mode("dark.6", "light.2")(props),
      },
      "*": {
        fontFamily: "heading",
      },
      body: {
        bg: "#ebebeb",
      },
    }),
  },
  colors,
  semanticTokens,
  components,
});

export default theme;
