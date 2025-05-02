import {
  chakra,
  forwardRef,
  omitThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { cx } from "@chakra-ui/shared-utils";
import { CardLicitaProps } from "./CardLicitaType";

export const CardLicita = forwardRef<CardLicitaProps, "div">(
  function CardLicita(props, ref) {
    const {
      direction,
      align,
      justify,
      wrap,
      basis,
      grow,
      shrink,
      label,
      ...rest
    } = props;

    const containerProps = {
      display: "flex",
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      ...rest,
    };

    const styles = useMultiStyleConfig("CardLicita", {
      container: containerProps,
    });
    const { className, ...restLicita } = omitThemingProps(containerProps);
    return (
      <chakra.div
        ref={ref}
        className={cx("ui-card-licita", className)}
        {...restLicita}
        __css={styles.container}
      >
        <chakra.span
          __css={styles.badge}
          paddingInlineStart={`${styles.badge.paddingInlineStart}`}
          paddingInlineEnd="1rem"
        >
          {label}
        </chakra.span>
        {props.children}
      </chakra.div>
    );
  }
);

CardLicita.displayName = "CardLicita";
