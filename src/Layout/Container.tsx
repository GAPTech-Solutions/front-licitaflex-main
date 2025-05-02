import { PropsWithChildren } from "react";
import { ContainerCss } from "./style";

type ContainerProps = PropsWithChildren;
export default function Container(props: ContainerProps) {
  return <ContainerCss {...props} />;
}
