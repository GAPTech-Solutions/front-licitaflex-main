import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
type WizardState<T = unknown> = {
  stepActive: number;
  numberSteps: number;
  navigationStepActive: boolean;
  validateStep: Record<number, (step: number) => boolean>;
  data?: T;
};
type WizardContextType<T = unknown> = {
  wizard: WizardState<Partial<T>>;
  setData: (data: Partial<T>) => void;
  setNumberSteps: (numberSteps: number) => void;
  setStepActive: (stepActive: number) => void;
  setNavigationStepActive: (navigationStepActive: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  setValidationStep: (
    step: number,
    validade: (step: number) => boolean
  ) => void;
};
const defaultContext = {
  wizard: {
    stepActive: 0,
    numberSteps: 0,
    navigationStepActive: true,
    validateStep: {},
  },
  setNumberSteps: () => {},
  setStepActive: () => {},
  setNavigationStepActive: () => {},
  nextStep: () => {},
  prevStep: () => {},
  setValidationStep: () => {},
  setData: () => null,
};

type WizardContextProviderProps<T = unknown> = {
  data?: T;
  active?: number;
} & PropsWithChildren;
export const WizardContext = createContext<WizardContextType>(defaultContext);

export function WizardContextProvider<T = unknown>(
  props: WizardContextProviderProps<Partial<T>>
): JSX.Element {
  const { children, data, active = 0 } = props;
  const [wizard, setWizardContext] = useState<WizardState<Partial<T>>>({
    ...defaultContext.wizard,
    stepActive: active,
    data,
  });

  const setData = (data: Partial<T>) => {
    setWizardContext((state) => ({
      ...state,
      data: { ...state.data, ...data },
    }));
  };
  const setNumberSteps = (numberSteps: number) => {
    setWizardContext((state) => ({ ...state, numberSteps }));
  };
  const setStepActive = (stepActive: number) => {
    if (
      stepActive === wizard.stepActive ||
      stepActive < 0 ||
      stepActive > wizard.numberSteps
    )
      return;
    if (stepActive < wizard.stepActive) {
      setWizardContext((state) => ({ ...state, stepActive }));
      return;
    }
    for (let i = wizard.stepActive; i < stepActive; i++) {
      const validate = wizard.validateStep[i];
      if (validate && !validate(i)) {
        return;
      }
    }
    setWizardContext((state) => ({ ...state, stepActive }));
  };
  const nextStep = () => {
    if (wizard.numberSteps <= wizard.stepActive) return;
    const nextStep = wizard.stepActive + 1;
    setStepActive(nextStep);
  };
  const setValidationStep = (
    step: number,
    validade: (step: number) => boolean
  ) => {
    setWizardContext((state) => ({
      ...state,
      validateStep: { ...state.validateStep, [step]: validade },
    }));
  };
  const prevStep = () => {
    if (wizard.stepActive <= 0) return;
    const previousStep = wizard.stepActive - 1;
    setStepActive(previousStep);
  };
  const setNavigationStepActive = (navigationStepActive: boolean) => {
    if (wizard.navigationStepActive === navigationStepActive) return;
    setWizardContext((state) => ({ ...state, navigationStepActive }));
  };

  const dataFinal = useMemo(() => {
    return { ...data, ...wizard.data };
  }, [data, wizard.data]);
  const { Provider } = WizardContext;
  return (
    <Provider
      value={{
        wizard: { ...wizard, data: dataFinal },
        setData,
        setNumberSteps,
        setStepActive,
        nextStep,
        prevStep,
        setNavigationStepActive,
        setValidationStep,
      }}
    >
      {children}
    </Provider>
  );
}

export function useWizard<T = unknown>() {
  return useContext<WizardContextType<T>>(WizardContext);
}

export function useSetNumberSteps(numberSteps: number) {
  const { setNumberSteps } = useWizard();
  setNumberSteps(numberSteps);
}
