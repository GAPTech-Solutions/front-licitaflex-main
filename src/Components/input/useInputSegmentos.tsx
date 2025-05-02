import { useMetaDadosService } from "@/data/services/meta.dados.sevice";
import { Segmento } from "@/data/types/Segmento";
import { useOutsideClick } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

export type InputSegmentosProps = {
  onChange?: (segmento: Segmento[]) => void;
  values?: Segmento[];
};
export default function useInputSegmentos(props: InputSegmentosProps) {
  const { onChange, values } = props;
  const metaDados = useMetaDadosService();
  const timeOut = useRef<number | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const resultadoBusca = useRef<Segmento[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [preview, setPreview] = useState<Segmento[]>([]);
  const [segmentosSelecionados, setSegmentosSelecionados] = useState<
    Segmento[]
  >([]);

  const adicionarElementosPreview = (
    segmentos: Segmento[],
    selecionados?: Segmento[]
  ) => {
    const selecionadosComparacao = selecionados ?? segmentosSelecionados;
    let segmentosUnicos: Segmento[] = [...segmentos];
    if (selecionadosComparacao.length > 0) {
      segmentosUnicos = segmentos.filter((s) =>
        selecionadosComparacao.every((e) => e.id !== s.id)
      );
    }
    segmentosUnicos = segmentosUnicos.splice(0, 5);
    return segmentosUnicos;
  };
  const buscaSegmentos = async (event: ChangeEvent<HTMLInputElement>) => {
    if (timeOut.current) clearTimeout(timeOut.current);

    timeOut.current = setTimeout(async () => {
      const dados = await metaDados.segmentos({
        busca: event.target.value,
        itensPagina: 20,
      });
      resultadoBusca.current = dados.dados;
      setPreview(() => adicionarElementosPreview(dados.dados ?? []));
    }, 400);
  };

  const itemSelecionado = (segmento: Segmento) => {
    return (
      segmentosSelecionados.find((e) => e.id === segmento.id) !== undefined
    );
  };
  const select = (segmento: Segmento) => {
    if (itemSelecionado(segmento)) return;
    const segmentosNovos = [...segmentosSelecionados, segmento];
    setSegmentosSelecionados(segmentosNovos);
    const previewNovo = adicionarElementosPreview(
      resultadoBusca.current,
      segmentosNovos
    );
    setPreview(() => previewNovo);
    onChange?.(segmentosNovos);
  };

  const focus = () => {
    setDisplay(() => true);
  };

  const remover = (segmento: Segmento) => {
    const selecionado = segmentosSelecionados.filter(
      (s) => s.id !== segmento.id
    );
    setSegmentosSelecionados(() => selecionado);
    const previewNovo = adicionarElementosPreview(
      resultadoBusca.current,
      selecionado
    );
    setPreview(() => previewNovo);
    onChange?.(selecionado);
  };

  const mergeValueProps = (novos: Segmento[]) => {
    if (novos.length === 0) return;
    if (segmentosSelecionados.length === 0) {
      setSegmentosSelecionados(novos);
      return;
    }

    const segmentosNovos = segmentosSelecionados.filter((s) =>
      novos.every((n) => n.id !== s.id)
    );
    if (segmentosNovos.length === 0) return;
    setSegmentosSelecionados([...segmentosSelecionados, ...segmentosNovos]);
  };

  const closeOpenList = useCallback(
    (e: HTMLElement) => {
      if (e.classList.contains("multi-select--list")) return;
      if (!display) return;
      setDisplay(false);
    },
    [display]
  );

  useOutsideClick({
    ref: inputRef,
    handler: (e) => closeOpenList(e.target as HTMLElement),
  });

  useEffect(() => {
    if (!values) return;
    mergeValueProps(values);
  }, [values]);

  useEffect(() => {
    return () => {
      if (timeOut.current) clearInterval(timeOut.current);
    };
  }, []);

  return {
    buscaSegmentos,
    focus,
    select,
    itemSelecionado,
    remover,
    preview,
    display,
    segmentosSelecionados,
    inputRef,
  };
}
