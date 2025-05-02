import { ButtonProps, forwardRef, Button } from "@chakra-ui/react";
import { IconArrowForward } from "../icons";

const buttonPropsDefault: ButtonProps = {
  type: "button",
  alignSelf: "flex-end",
  colorScheme: "azul",
  rightIcon: <IconArrowForward />,
  paddingY: "0.25rem",
  height: "12",
  mt: "2rem",
  children: "PRÓXIMA ETAPA",
};
const ButtonSteps = forwardRef<ButtonProps, "button">((props, ref) => {
  const propsFinal = { ...buttonPropsDefault, ...props };
  return <Button {...propsFinal} ref={ref} />;
});

export default ButtonSteps;
