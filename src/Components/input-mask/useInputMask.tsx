import { InputProps, useMergeRefs } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useMemo, useRef } from "react";
export type InputMaskProps = { mask: string } & InputProps;
export default function useInputMask(props: InputMaskProps, ref: any) {
  const { mask, onChange, placeholder, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const mergeRefs = useMergeRefs(ref, inputRef);
  function criarMascara(mask: string, value: string): string {
    let mascaraValue = "";
    let i = 0;
    const unmaskedValue = value.replace(/[^\d]/g, ""); // remove caracteres não numéricos

    for (const m of mask) {
      if (i >= unmaskedValue.length) break;
      if (m === "#") {
        mascaraValue += unmaskedValue[i];
        i++;
      } else {
        mascaraValue += m;
      }
    }
    return mascaraValue;
  }
  const onChangeMask = (event: ChangeEvent<HTMLInputElement>) => {
    const unmaskedValue = event.target.value.replace(/[^\d]/g, ""); // remove caracteres não numéricos
    let mascaraValue = criarMascara(mask, unmaskedValue);

    event.target.value = mascaraValue;

    onChange?.(event);
  };

  const placeHolder = useMemo(() => {
    if (placeholder) return placeholder;
    const lenght = mask.length;
    return criarMascara(mask, "".padStart(lenght, "0"));
  }, [placeholder, mask]);

  useEffect(() => {
    if (!inputRef.current) return;
    if (inputRef.current.value === "") return;
    const unmaskedValue = inputRef.current.value.replace(/[^\d]/g, ""); // remove caracteres não numéricos
    let mascaraValue = criarMascara(mask, unmaskedValue);
    inputRef.current.value = mascaraValue;
  }, []);
  return { onChangeMask, mergeRefs, rest, placeHolder };
}
