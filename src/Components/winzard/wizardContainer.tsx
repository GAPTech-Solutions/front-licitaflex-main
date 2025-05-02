import { BoxProps } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useWizard } from "./context/WizardContext";
import { WizardContent } from "./wizardContent";

export type WizardContainerProps = {
  children: ReactElement<{}, typeof WizardContent>[];
} & BoxProps;

export const WizardContainer = (props: WizardContainerProps) => {
  const { wizard: winzard } = useWizard();
  return <>{props.children[winzard.stepActive]}</>;
};
