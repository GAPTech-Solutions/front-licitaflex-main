import { IconDropDown } from "@/Components/icons/iconDropDown";
import {
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MenuFiltroItemProps, MenuFiltroProps } from "./MenuFiltro.type";
import { useMenuFiltro } from "./useMenuFiltro";

const MenuFiltroItem = (
  props: MenuFiltroItemProps & {
    gerarClick: (filtro: string, group?: string | undefined) => () => void;
    group?: string;
    selecionados?: string[];
  }
) => {
  const { item, group, selecionados = [], gerarClick, ...rest } = props;
  if (typeof item == "string") {
    return (
      <MenuItem
        as={Checkbox}
        {...rest}
        onChange={gerarClick(item, group)}
        isChecked={selecionados.includes(item)}
      >
        {item}
      </MenuItem>
    );
  }

  return (
    <MenuGroup title={item.title}>
      {item.childrens.map((child, i) => (
        <MenuFiltroItem
          item={child}
          key={i}
          gerarClick={gerarClick}
          group={item.title}
          {...rest}
          selecionados={selecionados}
        />
      ))}
    </MenuGroup>
  );
};

export default function MenuFiltro(props: MenuFiltroProps) {
  const {
    clickFiltro,
    titulo,
    itens,
    props: rest,
    selecionados,
  } = useMenuFiltro(props);

  return (
    <Menu {...rest}>
      <MenuButton as={Button} variant="ghost" rightIcon={<IconDropDown />}>
        {titulo}
      </MenuButton>
      <MenuList>
        {itens.map((item, i) => (
          <MenuFiltroItem
            selecionados={selecionados}
            as={Checkbox}
            key={i}
            item={item}
            gerarClick={clickFiltro}
            group={titulo}
          ></MenuFiltroItem>
        ))}
      </MenuList>
    </Menu>
  );
}
