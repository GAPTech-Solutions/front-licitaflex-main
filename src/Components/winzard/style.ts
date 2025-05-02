import { colors } from "@/assets/theme/colors";
import { Box, chakra, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const azul = colors.azul[3];


export const ContainerWizardStyle = styled(Box)`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  overflow-x: hidden;
  max-height: 100%;
`;

export const StepsStyle = styled(chakra.ul)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const StepItemIndexText = styled("span")`
  height: 1.5rem;
  width: 1.5rem;
  min-width: 1.5rem;
  background: ${colors.light[4]};
  color: white;
  font-weight: 600;
  line-height: 1.5rem;
  text-align: center;
  vertical-align: middle;
  border-radius: 999px;
  font-size: 1rem;
`;

export const StepItemStyle = styled(chakra.li)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.75rem;
  flex: 1;
  padding: 0 1rem;
  height: 56px;
  gap: 0.625rem;
  cursor: pointer;
  border-bottom: 4px solid ${colors.light[4]};
  color: ${colors.dark[6]};
  font-weight: 700;
  &[aria-selected] {
    border-color: ${azul};
    .-step-item--active {
      background: ${azul};
    }
  }
  &[data-complete="true"] {
    border-color: ${colors.verde[3]};
    .-step-item--completed {
      background: ${colors.verde[3]};
    }
  }
`;

export const StepItemNameText = styled(Text)`
  text-transform: uppercase;
`;

export const StepItemDecriptionText = styled(Text)`
  font-weight: 500;
  font-size: 0.875rem;
  color: gray;
`;

export const StepContainerStyleSimple = styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  @media screen and (max-width: 960px) {
    align-items: center;
    align-content: center;
  }
`;

export const StepContainerStyle = styled(Box)`
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 100%;
  @media screen and (max-width: 960px) {
    align-items: center;
    align-content: center;
  }
`;

export const StepContainerFigureStyle = styled(Box)`
  flex-grow: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const StepContainerFormularioStyle = styled(Box)`
  flex-grow: 0.5;
  margin: 1rem 0 0 0;
  padding: 1.375rem 3rem;
  background: black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: calc(100vh - 13rem);
  h1 {
    font-weight: 700;
    font-size: 1.5rem;
  }
  label {
    font-size: 0.875rem;
  }
  @media screen and (max-width: 960px) {
    flex: 1;
    align-content: center;
    min-height: auto;
    padding: 1.375rem 2rem;
  }
  @media screen and (max-width: 400px) {
    flex: 1;
    align-content: center;
    min-height: auto;
    padding: 1.375rem 1rem;
  }
`;

export const StepContainerFormularioInputStyle = styled(chakra.div)`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;
export const StepRowStyle = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  h1 {
    font-size: 1.25rem;
  }
  @media screen and (max-width: 960px) {
    flex-direction: column;

    align-content: center;
  }
`;

export const StepRowCenterStyle = styled(StepRowStyle)`
  justify-content: center;
  @media screen and (max-width: 960px) {
    flex-direction: row;
  }
`;
