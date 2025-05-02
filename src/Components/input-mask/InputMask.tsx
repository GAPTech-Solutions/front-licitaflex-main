import { forwardRef, Input, InputProps } from "@chakra-ui/react";
import { ForwardedRef } from "react";
import useInputMask from "./useInputMask";

export type InputMaskProps = { mask: string } & InputProps;
const InputMask = forwardRef<InputMaskProps, "input">(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const { onChangeMask, placeHolder, mergeRefs, rest } = useInputMask(
      props,
      ref
    );

    return (
      <Input
        placeholder={placeHolder}
        onChange={onChangeMask}
        {...rest}
        ref={mergeRefs}
      />
    );
  }
);

export default InputMask;
