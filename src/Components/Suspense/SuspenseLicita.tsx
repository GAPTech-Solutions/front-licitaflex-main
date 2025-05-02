import { Fade, Flex, forwardRef, Spinner } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type SuspenseLicitaProps = {
  isLoading?: boolean;
} & PropsWithChildren;
export const SuspenseLicita = forwardRef<SuspenseLicitaProps, "div">(
  (props, ref) => {
    const { children, isLoading } = props;
    if (isLoading) {
      return (
        <Flex
          ref={ref}
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Fade in={isLoading}>
            <Spinner />
          </Fade>
        </Flex>
      );
    }
    return (
      <Fade
        style={{ height: "100%", overflowY: "auto", position: "relative" }}
        in={!isLoading}
      >
        {children}
      </Fade>
    );
  }
);
