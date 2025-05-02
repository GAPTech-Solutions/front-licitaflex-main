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
type InputPercentagemProps = {
  separadorDecimal?: "," | ".";
  precisao?: number;
  locale?: string;
  atribuirMaximosMinimo?: boolean;
} & InputProps;
export const InputPercentagem = forwardRef<InputPercentagemProps, "input">(
  (props, ref) => {
    const {
      onKeyDown,
      onChange,
      precisao = 2,
      locale = "pt-BR",
      separadorDecimal = ",",
      atribuirMaximosMinimo = false,
      max,
      min,
      ...rest
    } = props;
    const format = useMemo(
      () =>
        new Intl.NumberFormat(locale, {
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
      let valorNumero = Number.parseString(valorLimpo, { safe: true });
      if (max && Number(max) < valorNumero) {
        valorNumero = atribuirMaximosMinimo
          ? Number(max)
          : Number.parseString(valueDown.current, { safe: true });
      }
      if (min && Number(min) > valorNumero) {
        valorNumero = atribuirMaximosMinimo
          ? Number(min)
          : Number.parseString(valueDown.current, { safe: true });
      }
      const valorInput = `${format.format(valorNumero)} %`;
      event.target.value = valorInput;
      const selectStart = valorInput.length - 2;
      event.target.setSelectionRange(selectStart, selectStart);
      onChange?.(event);
    };

    useEffect(() => {
      const valueInputRef = refInput.current?.value;
      if (valueInputRef && valueInputRef !== "") {
        refInput.current.value = `${format.format(
          Number.parseString(valueInputRef, { safe: true })
        )} %`;
      }
    }, []);

    return (
      <Input {...rest} ref={refMerge} onKeyDown={keyDown} onChange={change} />
    );
  }
);
