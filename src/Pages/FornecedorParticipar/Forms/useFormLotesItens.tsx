import useModal from "@/Components/Modal/Conteudo/useModal";
import { useWizard } from "@/Components/winzard/context/WizardContext";
import ParticiparFornecedorDto from "@/data/dto/participar.forncedor.dto";
import ParticiparFornecedorLotesDto from "@/data/dto/participar.fornecedor.lotes.dto";
import { Edital } from "@/data/types/Edital";
import { Item } from "@/data/types/Item";
import { Lote } from "@/data/types/Lote";
import useToast from "@/hooks/toast/useToast";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import FormConfirmarLotes from "./FormConfirmarLotes";

export type FormLotesItensProps = {
  edital?: Edital;
};
export type FormLotesItensValues = {
  [key: string]: { lotes: ParticiparFornecedorDto["lotes"] };
};

export default function useFormLotesItens(props: FormLotesItensProps) {
  const { edital } = props;
  const {
    wizard: { data },
    setData,
    nextStep,
  } = useWizard<ParticiparFornecedorDto>();
  const {
    props: modalProps,
    open,
    close: closeModal,
  } = useModal({ size: "4xl" });

  const toast = useToast();
  const concatenaDefaultValues = (
    item: Item,
    loteDto: ParticiparFornecedorDto["lotes"]
  ) => {
    const itemDto = loteDto.find((i) => i.itemId === item.id);
    if (itemDto) return itemDto;
    return {
      itemId: item.id,
      descricao: item.descricao,
      fabricante: "",
      marca: "",
      modeloVersao: "",
      valor: "",
    };
  };
  const defaultValueLotes: (lotes?: Lote[]) => FormLotesItensValues = (
    lotes?: Lote[]
  ) => {
    const retorno = lotes?.reduce((p, lote) => {
      const index = lote.sequencia;
      return {
        ...p,
        [index]: {
          lotes: lote.items.map((i) =>
            concatenaDefaultValues(i, data?.lotes ?? [])
          ),
        },
      };
    }, {} as FormLotesItensValues);
    return retorno ?? {};
  };
  const { handleSubmit, formState, register, watch } =
    useForm<FormLotesItensValues>({
      defaultValues: defaultValueLotes(edital?.lotes),
    });

  const lotes = watch();

  const quantidadeItem = (sequencia: number, idItem: string) => {
    return (
      edital?.lotes
        .find((l) => l.sequencia === sequencia)
        ?.items.find((i) => i.id === idItem)?.quantidade ?? 1
    );
  };

  const valorLotes = useMemo(() => {
    const keys = Object.keys(lotes);
    const retorno: { [key: string]: Number } = {};
    keys.forEach((k) => {
      const total = lotes[k].lotes
        .map((l) => Number(l.valor) * quantidadeItem(Number(k), l.itemId))
        .reduce((parcial, v) => parcial + v, 0);
      retorno[k] = total;
    });
    return retorno;
  }, [lotes]);

  const validarLote = (lote: string, items: ParticiparFornecedorLotesDto[]) => {
    const loteBanco = edital?.lotes.find((l) => l.sequencia === Number(lote));
    if (!loteBanco) return false;
    if (loteBanco.items.length !== items.length) return false;
    for (const item of items) {
      if (item.descricao === "") return false;
      if (
        loteBanco.marcaFabricante &&
        (item.fabricante === "" || item.marca === "")
      )
        return false;
      if (item.valor === "") return false;
    }
    return true;
  };
  const salvarItem = (values: FormLotesItensValues) => {
    const lotesObjeto: ParticiparFornecedorDto["lotes"] = [];
    const lotesValido: { [key: string]: ParticiparFornecedorLotesDto[] } = {};
    for (const item in values) {
      if (!validarLote(item, values[item].lotes)) continue;
      lotesValido[item] = [...values[item].lotes];
    }

    if (Object.keys(lotesValido).length === 0) {
      toast({
        title: "LicitaFlex",
        description: "Você precisa participar de pelo menos um lote",
        status: "warning",
      });
      return;
    }
    open({
      title: "Confirme os lotes que deseja participar",
      content: {
        component: FormConfirmarLotes,
        props: {
          lotes: lotesValido,
          onConfirm(lotes) {
            lotes.forEach((element) => {
              lotesObjeto.push(...lotesValido[element]);
            });
            setData({ lotes: lotesObjeto });
            closeModal();
            nextStep();
          },
        },
      },
    });
  };

  return {
    register,
    formState,
    submit: handleSubmit(salvarItem),
    lotes: edital?.lotes,
    modalProps,
    valorLotes,
  };
}
