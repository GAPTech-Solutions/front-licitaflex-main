import { BoxProps } from "@chakra-ui/react";
import { ReactElement } from "react";
import { WizardContextProvider } from "./context/WizardContext";
import { ContainerWizardStyle } from "./style";
import { WizardContainer } from "./wizardContainer";
import { WizardContent, WizardContentProps } from "./wizardContent";
import { WizardSteps } from "./wizardSteps";

export type WizardProps<T = unknown> = {
  children: ReactElement<WizardContentProps, typeof WizardContent>[];
  active?: number;
  navigationStepActive?: boolean;
  data?: Partial<T>;
} & BoxProps;
export function Wizard<T = unknown>(props: WizardProps<T>) {
  const {
    navigationStepActive = false,
    data = {},
    active,
    ...propsStyle
  } = props;

  return (
    <WizardContextProvider data={data} active={active}>
      <ContainerWizardStyle>
        <WizardSteps navigationStepActive={navigationStepActive}>
          {propsStyle.children}
        </WizardSteps>
        <WizardContainer {...propsStyle} />
      </ContainerWizardStyle>
    </WizardContextProvider>
  );
}
