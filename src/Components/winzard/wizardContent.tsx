import omitKeys from "@/utils/omitKeys";
import { BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Col } from "../layout/col";

export type WizardContentProps = {
  description: string;
  nameLong: string;
  nameShort: string;
  children: ReactNode;
  validate?: (index: number) => boolean;
  isVisible?: boolean;
} & BoxProps;
export const WizardContent = (props: WizardContentProps) => {
  const propsBox = omitKeys(props, [
    "children",
    "validate",
    "description",
    "nameLong",
    "nameShort",
    "isVisible",
  ]);
  return (
    <Col padding="2rem" overflowY="auto" {...propsBox}>
      {props.children}
    </Col>
  );
};
