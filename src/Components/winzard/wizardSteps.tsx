import { useEffect, useMemo } from "react";
import { useWizard } from "./context/WizardContext";

import { StepsStyle } from "./style";
import { WizardContent, WizardContentProps } from "./wizardContent";
import { WizardStepItem } from "./wizardStep";

export type StepsProps = {
  children: React.ReactElement<WizardContentProps, typeof WizardContent>[];
  navigationStepActive?: boolean;
};
export const WizardSteps = (props: StepsProps) => {
  const { navigationStepActive = false } = props;
  const { setNumberSteps, setNavigationStepActive, setValidationStep } =
    useWizard();

  const steps = useMemo(() => {
    return props.children.filter((tab) => !tab.props.isVisible);
  }, [props.children]);

  useEffect(() => {
    setNumberSteps(steps.length ?? 0);
    setNavigationStepActive(navigationStepActive);
    steps.forEach((child, index) => {
      if (child.props.validate) {
        setValidationStep(index, child.props.validate);
      }
    });
  }, [steps]);

  return (
    <nav>
      <StepsStyle>
        {steps.map((tab, index) => (
          <WizardStepItem
            {...tab.props}
            index={index}
            key={index}
          ></WizardStepItem>
        ))}
      </StepsStyle>
    </nav>
  );
};
