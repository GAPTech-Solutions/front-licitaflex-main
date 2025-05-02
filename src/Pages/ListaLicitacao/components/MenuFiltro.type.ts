import { MenuItemProps, MenuProps } from "@chakra-ui/react";

export type FiltroItem =
  | {
      title: string;
      childrens: string[];
    }
  | string;

  export type MenuFiltroProps = {
  itens: FiltroItem[];
  selecionados?:string[];
  children:string;
  onClick?:(filtro:string)=>void;
} & Omit<MenuProps, "children"|"onClick">;

export type MenuFiltroItemProps = {
  item: FiltroItem,    
}&Omit<MenuItemProps,"onClick">