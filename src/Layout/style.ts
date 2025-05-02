import styled from "@emotion/styled";

const container = "var(--licita-flex-colors-container-bg)";
export const LayoutBaseCss = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  gap: 1rem;
  grid-template:
    "nav nav" 64px
    "sidenav content" auto
    / 300px auto;
`;

export const HeaderCss = styled.header`
  grid-area: nav;
  background-color: ${container};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  gap: 1rem;
`;

export const ContainerCss = styled.main`
  grid-area: content;
  background-color: ${container};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  height: calc(100vh - 5.5rem);
`;

export const AsideCss = styled.aside`
  grid-area: sidenav;
  background-color: ${container};
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    a {
      font-family: "Red Hat Display";
      font-size: 14px;
      font-weight: 900;
      line-height: 19px;
    }
  }
`;
