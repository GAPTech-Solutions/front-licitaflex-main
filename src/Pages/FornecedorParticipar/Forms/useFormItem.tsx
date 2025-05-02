import { Item } from "@/data/types/Item";
import { ChangeEvent } from "react";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import { FormLotesItensValues } from "./useFormLotesItens";
import { Lote } from "@/data/types/Lote";
import { Edital } from "@/data/types/Edital";
import { EditalTipoIntevaloEnum } from "@/data/enum/EditalTipoIntevaloEnum";
import { useFornecedorParticipar } from "../Context/FornecedorParticiparContext";

export type FormItemProps = {
  items: Item[];
  onChangeValue?: (value: string) => void;
  register: UseFormRegister<FormLotesItensValues>;
  lote: Lote;
  formState: FormState<FormLotesItensValues>;
};

export default function useFormItem(props: FormItemProps) {
  const { items, lote, onChangeValue, register } = props;
  const { edital } = useFornecedorParticipar();

  const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    onChangeValue?.(valor);
  };

  function validarValorProposto(value: string | number, item: number) {
    if (value == "" || value == undefined) {
      return true;
    }
    if (lote.sigilioso) {
      return true;
    }
    const valorReferencia = Number.parseString(
      lote.items[item].valorUnitario.toString(),
      {
        safe: true,
      }
    );
    if (valorReferencia == 0) {
      return true;
    }
    const valorNumber = Number.parseString(value.toString(), { safe: true });
    if (
      edital?.tipoIntervalo == EditalTipoIntevaloEnum.MaiorPreco &&
      valorNumber < valorReferencia
    ) {
      return `O valor deve ser maior que o valor de referência: ${lote.items[item].valorUnitario}`;
    }
    if (
      edital?.tipoIntervalo == EditalTipoIntevaloEnum.MenorPreco &&
      valorNumber > valorReferencia
    ) {
      return `O valor deve ser menor que o valor de referência: ${lote.items[item].valorUnitario}`;
    }

    return true;
  }

  function validarDescricao(
    value: string,
    item: number,
    formValues: FormLotesItensValues
  ) {
    const valorNumber = Number.parseString(
      formValues?.[lote.sequencia]?.lotes?.[item]?.valor,
      { safe: true }
    );
    if (valorNumber == 0) {
      return true;
    }
    if (value.trim() == "") {
      return "Você deve preencher a descrição";
    }
    return true;
  }

  return {
    lote,
    sequencia: lote.sequencia,
    items,
    validarValorProposto,
    register,
    onChangeInputValue,
    validarDescricao,
  };
}
