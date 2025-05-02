import { MenuFiltroProps } from "./MenuFiltro.type";

export const useMenuFiltro = (props: MenuFiltroProps) => {
  const { itens, children, onClick, selecionados = [], ...rest } = props;

  const clickFiltro = (filtro: string, group?: string) => {
    const filtroFinal = group == undefined ? filtro : `${group}.${filtro}`;
    return () => {
      onClick?.(filtroFinal);
    };
  };
  return {
    props: rest,
    titulo: children,
    itens,
    selecionados,
    clickFiltro,
  };
};
