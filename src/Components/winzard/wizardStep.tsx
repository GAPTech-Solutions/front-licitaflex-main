import { colors } from "@/assets/theme/colors";
import { useColorModeValue } from "@chakra-ui/react";
import { useWizard } from "./context/WizardContext";
import { StepItemIndexText, StepItemNameText, StepItemStyle } from "./style";

export type WizardStepProps = {
  active?: boolean;
  description: string;
  nameLong: string;
  nameShort: string;
  index: number;
};
export const WizardStepItem = (props: WizardStepProps) => {
  const { nameLong, nameShort, index } = props;
  const visible = true;
  const { wizard: winzard, setStepActive } = useWizard();
  const active = winzard.stepActive == index ? true : undefined;
  const completed = winzard.stepActive > index;
  const color = useColorModeValue(colors.dark[6], colors.light[2]);
  const classNames = (prefix: string) => {
    const classes = [];
    if (completed) classes.push(`${prefix}-completed`);
    if (active) classes.push(`${prefix}-active`);

    return classes.join(" ");
  };
  return (
    <StepItemStyle
      aria-selected={active}
      data-complete={completed}
      onClick={() => winzard.navigationStepActive && setStepActive(index)}
    >
      <StepItemIndexText className={classNames("-step-item-")}>
        {index + 1}
      </StepItemIndexText>
      <StepItemNameText color={color}>
        {visible ? nameLong : nameShort}
      </StepItemNameText>
    </StepItemStyle>
  );
};
