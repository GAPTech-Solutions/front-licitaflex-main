import { PropsWithChildren } from "react";

type VisivelProps = {
  show: boolean;
} & PropsWithChildren;
export default function Visivel(props: VisivelProps) {
  const { show, children } = props;

  if (show) {
    return <>{children}</>;
  }
  return <></>;
}
