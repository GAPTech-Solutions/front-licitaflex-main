import ParticiparFornecedorLotesDto from "@/data/dto/participar.fornecedor.lotes.dto";
import { Edital } from "@/data/types/Edital";
import { Lote } from "@/data/types/Lote";
import { ChangeEvent, useRef } from "react";

export type FormConfirmarLotesProps = {
  lotes: { [key: string]: ParticiparFornecedorLotesDto[] };
  lote?: Lote;
  onConfirm?: (lotes: string[]) => void;
};
export default function useFormConfirmarLotes(props: FormConfirmarLotesProps) {
  const { onConfirm, lotes } = props;
  const lotesConfirm = useRef<string[]>([]);

  const onClick = () => {
    onConfirm?.(lotesConfirm.current);
  };

  const onChangeCheckeBox = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target;
    const value = element.value;

    if (element.checked) {
      lotesConfirm.current.push(value);
      return;
    }
    lotesConfirm.current = lotesConfirm.current.filter((l) => l !== value);
  };

  return { onClick, lotes, onChangeCheckeBox };
}
