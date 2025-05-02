import { useBreakpoint } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FiltroItem } from "./MenuFiltro.type";

const fitro = {
  processos: [
    { titulo: "Seus processos", valor: "seu-processo" },
    { titulo: "Favoritos", valor: "favoritos" },
    { titulo: "Novos", valor: "novos" },
  ],
  modalidade: [
    { titulo: "Pregão", valor: "pregao" },
    { titulo: "Dispensa", valor: "dispensa" },
    { titulo: "Leilão", valor: "leilao" },
    { titulo: "Credenciamento", valor: "credenciamento" },
  ],
  status: [
    { titulo: "Recebendo proposta", valor: "recebendo-proposta" },
    { titulo: "Em andamento", valor: "em-andamento" },
    { titulo: "Processo cancelado", valor: "processo-cancelado" },
    { titulo: "Processo suspenso", valor: "processo-suspenso" },
    { titulo: "Homologado", valor: "homologado" },
  ],
};

const formato = [
  { titulo: "Unitário", valor: "unitario" },
  { titulo: "Global", valor: "global" },
];
const disputa = [
  { titulo: "Aberta", valor: "aberta" },
  { titulo: "Aberta e Fechada", valor: "aberta-fechada" },
  { titulo: "Randômico", valor: "randomico" },
];
const intervalo = [
  { titulo: "Menor preço", valor: "menor-preco" },
  { titulo: "Maior preço", valor: "maior-preco" },
  { titulo: "Maior desconto", valor: "maior-desconto" },
  { titulo: "Maior lance", valor: "maior-lance" },
  { titulo: "Menor taxa", valor: "menor-taxa" },
];

const outros: FiltroItem[] = [
  { title: "Formato", childrens: formato.map((v) => v.titulo) },
  { title: "Disputa", childrens: disputa.map((v) => v.titulo) },
  {
    title: "Intervalo",
    childrens: intervalo.map((v) => v.titulo),
  },
];

export const useFiltro = () => {
  const [tags, setTags] = useState<string[]>([]);
  const breakpoint = useBreakpoint();

  const clickItemFiltro = (filtro: string) => {
    const tagFiltro = filtro.split(".")[1];
    setTags((state) => {
      if (tags.includes(tagFiltro)) return state.filter((t) => t !== tagFiltro);
      return [...state, tagFiltro];
    });
  };

  const removerTag = (filtro: string) => {
    const tagsNova = tags.filter((t) => t != filtro);
    setTags(tagsNova);
  };

  const expandido = useMemo(() => {
    const processos = fitro.processos.map((v) => v.titulo);
    const modalidade = fitro.modalidade.map((v) => v.titulo);
    const status = fitro.status.map((v) => v.titulo);
    if (["sm", "md", "lg"].includes(breakpoint)) {
      return {
        processos,
        modalidade,
        status,
        outros,
        formato: undefined,
        disputa: undefined,
        intervalo: undefined,
      };
    }
    return {
      processos,
      modalidade,
      formato: formato.map((v) => v.titulo),
      disputa: disputa.map((v) => v.titulo),
      intervalo: intervalo.map((v) => v.titulo),
      status,
      outros: undefined,
    };
  }, [breakpoint]);

  return { tags, clickItemFiltro, removerTag, ...expandido };
};
