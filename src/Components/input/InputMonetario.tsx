import { forwardRef, Input, InputProps, useMergeRefs } from "@chakra-ui/react";
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef } from "react";

const teclasPermitidas = [
  "Backspace",
  "ArrowRight",
  "ArrowLeft",
  "Delete",
  "Home",
  "Tab",
];
const caracteresPermitidos = [
  "0",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  ",",
  ".",
];

const todasPermitidas = [...teclasPermitidas, ...caracteresPermitidos];
type InputMonetarioProps = {
  separadorDecimal?: "," | ".";
  precisao?: number;
  locale?: string;
  currency?: string;
} & InputProps;
export const InputMonetario = forwardRef<InputMonetarioProps, "input">(
  (props, ref) => {
    const {
      onKeyDown,
      onChange,
      precisao = 2,
      locale = "pt-BR",
      separadorDecimal = ",",
      ...rest
    } = props;
    const format = useMemo(
      () =>
        new Intl.NumberFormat(locale, {
          currency: "BRL",
          style: "currency",
          maximumFractionDigits: precisao,
          minimumFractionDigits: precisao,
        }),
      [locale, precisao]
    );
    const refInput = useRef<HTMLInputElement>(null);

    const refMerge = useMergeRefs(ref, refInput);
    const valueDown = useRef<string>("");

    const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      valueDown.current = (event.target as HTMLInputElement).value;
      if (!todasPermitidas.includes(event.key)) event.preventDefault();
      onKeyDown?.(event);
    };

    const change = (event: ChangeEvent<HTMLInputElement>) => {
      const inputElement = event.target;
      const valueInput = inputElement.value;
      if (valueInput === valueDown.current) {
        event.preventDefault();
        return;
      }

      let valorLimpo = valueInput
        .replace(/[\D]/g, "")
        .padStart(precisao + 1, "0");

      if (valorLimpo.length > precisao) {
        const inicio = valorLimpo.substring(0, valorLimpo.length - precisao);
        const fim = valorLimpo.substring(
          valorLimpo.length - precisao,
          valorLimpo.length
        );
        valorLimpo = `${inicio}${separadorDecimal}${fim}`;
      }
      const valor = format.format(Number.parseString(valorLimpo));
      event.target.value = valor;
      onChange?.(event);
    };

    useEffect(() => {
      const valueInputRef = refInput.current?.value;
      if (valueInputRef && valueInputRef !== "") {
        refInput.current.value = format.format(
          Number.parseString(valueInputRef)
        );
      }
    }, []);

    return (
      <Input {...rest} ref={refMerge} onKeyDown={keyDown} onChange={change} />
    );
  }
);
