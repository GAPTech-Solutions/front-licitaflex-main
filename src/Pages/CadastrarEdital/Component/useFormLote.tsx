import { useEditalService } from "@/data/services/edital.sevice";
import { Item } from "@/data/types/Item";
import { Lote } from "@/data/types/Lote";
import useMutation from "@/hooks/requests/useMutation";
import { useFieldArray, useForm } from "react-hook-form";
import { FormLoteProps } from "./FormLote";
import { useCadastroEdital } from "../Context/CadastroEditalContext";

export default function useFormLote(props: FormLoteProps) {
  const { editalId, formatoLance, lote, close } = props;
  const { edital } = useCadastroEdital();
  const { register, formState, control, handleSubmit } = useForm<Lote>({
    defaultValues: {
      ...lote,
      items: [...(lote?.items ?? [])],
    },
  });
  const editalService = useEditalService();
  const { mutate } = useMutation({
    mutateFn: (values: Lote) => editalService.salvarLote(editalId, values),
    options: {
      onSuccess: () => {
        close?.();
      },
    },
  });
  const { fields, append, remove } = useFieldArray({ name: "items", control });

  const salvarLote = (value: Lote) => {
    mutate(value);
  };

  const adicionarItem = () => {
    if (formatoLance == 1 && fields.length > 0) {
      return;
    }
    append({ sequencia: fields.length + 1 } as Item);
  };
  const removerItem = (item: number) => {
    remove(item);
  };

  if (!lote && fields.length == 0) {
    adicionarItem();
  }

  const totalItem = (item: Item) => {
    const quantidade = item.quantidade ?? 0;
    const valorUnitario = item.valorUnitario ?? 0;
    return quantidade * valorUnitario;
  };
  const loteUnitario = formatoLance == 1;
  return {
    register,
    formState,
    items: fields,
    submit: handleSubmit(salvarLote),
    adicionarItem,
    removerItem,
    totalItem,
    loteUnitario,
  };
}
