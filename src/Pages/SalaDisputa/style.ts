import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
const container = "var(--licita-flex-colors-container-bg)";

export const HeaderCss = styled.header`
  grid-area: nav;
  background-color: ${container};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  gap: 1rem;
`;

export const LayoutSalaDisputaCss = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  gap: 1rem;
  grid-template:
    "nav nav nav" 64px
    "sidechat content sidedetalhe" auto
    / 350px auto 300px;
`;
export const ChatCss = styled.aside`
  grid-area: sidechat;
  background-color: ${container};
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5.5rem);
`;

export const ContainerDatelheCss = styled(Box)`
  grid-area: sidedetalhe;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding-right: 0.5rem;
`;

export const ItemDatelheCss = styled(Box)`
  background-color: ${container};
  border-radius: 0.5rem;
  padding-bottom: 0.5rem;
`;
export const ContainerSalaCss = styled.main`
  grid-area: content;
  background-color: ${container};
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  height: calc(100vh - 5.5rem);
`;
