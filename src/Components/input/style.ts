import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const InputContainerCss = styled(Box)`
  position: relative;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  flex-direction: column;
  gap: 0.25rem;
  width: ${({ width }) => (width ? width : "100%")};
`;

export const InputLabelCss = styled.label``;

export const ErrorMessageCss = styled.span`
  color: hsla(0, 84%, 60%, 1);

  font-weight: 500; ;
`;
export const SelectCss = styled.select`
  width: 100%;
  height: 40px;
  padding: 0 1rem;
  border-radius: 5px;
  border: 2px solid #ececec;
  background: #fff;
  color: blue;
`;

export const MultiSelectContainerCss = styled.div`
  align-items: center;
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 38px;
  position: relative;
  transition: all 100ms ease 0s;
  border-radius: 4px;
  border: 2px solid #ececec;
  background: #fff;
  color: blue;
  box-sizing: border-box;
  outline: 0px !important;
`;

export const MultiSelectPlaceholderCss = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  color: rgb(128, 128, 128);
  margin-left: 2px;
  margin-right: 2px;
  box-sizing: border-box;
`;

export const MultiSelectContainerDropdownCss = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
`;

export const MultiSelectContainerInputCss = styled.div`
  align-items: center;
  display: grid;
  flex: 1 1 0%;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  padding: 2px 8px;
  box-sizing: border-box;
`;
export const MultiSelectInputCss = styled.div`
  visibility: visible;
  flex: 1 1 auto;
  display: inline-grid;
  grid-area: 1 / 1 / 2 / 3;
  grid-template-columns: 0px min-content;
  margin: 2px;
  padding-bottom: 2px;
  padding-top: 2px;
  color: rgb(51, 51, 51);
  box-sizing: border-box;
  input {
    color: inherit;
    background: 0px center;
    opacity: 1;
    width: 100%;
    grid-area: 1 / 2 / auto / auto;
    min-width: 2px;
    outline: 0px;
  }
  ::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre;
    grid-area: 1 / 2 / auto / auto;
    font: inherit;
    min-width: 2px;
    border: 0px;
    margin: 0px;
    outline: 0px;
    padding: 0px;
  }
`;
export const MultiSelectBadgeContainerCss = styled.div`
  display: flex;
  min-width: 0px;
  background-color: rgb(230, 230, 230);
  border-radius: 2px;
  margin: 2px;
  box-sizing: border-box;
`;

export const MultiSelectBadgeTextCss = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  color: rgb(51, 51, 51);
  font-size: 85%;
  padding: 3px 3px 3px 6px;
  box-sizing: border-box;
`;

export const MultiSelectBadgeRemoveCss = styled.div`
  align-items: center;
  display: flex;
  border-radius: 2px;
  padding-left: 4px;
  padding-right: 4px;
  box-sizing: border-box;
  svg {
    width: 0.5em;
  }
`;

export const MultiSelectListContainerCss = styled.ul`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem 0;
  list-style: none;
  border-radius: 5px;
  border: 1px solid #eee;
  background: #fff;
  top: 60px;

  z-index: 1000;
`;

export const MultiSelectListCss = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  width: 100%;
  padding: 0.5rem 1rem;

  &:hover {
    background: #ccc;
    cursor: pointer;
  }
`;
