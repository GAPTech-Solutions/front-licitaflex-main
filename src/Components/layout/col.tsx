import { chakra, FlexProps, forwardRef } from "@chakra-ui/react";

export type ColProps = Exclude<FlexProps, "direction">;

export const Col = forwardRef<ColProps, "div">((props, ref) => {
  const {
    align = "flex-stretch",
    justify,
    wrap,
    basis,
    grow,
    shrink,
    gap = "1rem",
    ...rest
  } = props;

  const styles = {
    display: "flex",
    flexDirection: "column",
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink,
    gap,
  };

  return <chakra.div ref={ref} __css={styles} {...rest} />;
});
