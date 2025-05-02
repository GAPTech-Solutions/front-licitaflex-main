import { ModalFooter, ModalHeader } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const ModalHeaderStyle = styled(ModalHeader)`
  display: flex;
  font-size: 1.5rem;
  gap: 0.5rem;
  align-items: center;
  align-content: center;
  padding-bottom: 0.5rem;
  font-size: 20px;
  text-transform: uppercase;
`;

export const ModalFooterStyle = styled(ModalFooter)`
  display: flex;
  gap: 0.25rem;
  button {
    flex: 1;
  }
`;
