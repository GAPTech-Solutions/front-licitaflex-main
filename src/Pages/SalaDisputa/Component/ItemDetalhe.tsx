import { IconProps } from "@/Components/icons";
import { ComponentWithAs } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { ItemDatelheCss } from "../style";
import { ItemBodyCss, ItemTitleCss } from "./style";

type ItemDetalheProps = {
  title: string;
  iconRight?: ComponentWithAs<"svg", IconProps>;
  iconLeft?: ComponentWithAs<"svg", IconProps>;
  height?: string;
} & PropsWithChildren;
export default function ItemDetalhe(props: ItemDetalheProps) {
  const {
    title,
    iconRight: IconRight,
    iconLeft: IconTitle,
    children,
    height,
  } = props;
  return (
    <ItemDatelheCss height={height}>
      <ItemTitleCss>
        <div>
          {IconTitle && <IconTitle />}
          {title}
        </div>
        {IconRight && <IconRight />}
      </ItemTitleCss>
      <ItemBodyCss>{children}</ItemBodyCss>
    </ItemDatelheCss>
  );
}
