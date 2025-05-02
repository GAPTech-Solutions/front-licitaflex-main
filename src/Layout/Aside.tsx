import menu from "@/Config/menu";
import { useAuth } from "@/Context/AuthContext";
import { ProviderEnum } from "@/data/enum/ProviderEnum";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import { Link, List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AsideCss } from "./style";

export default function Aside() {
  const { link } = useNavigateLicitaFlex();
  const { tokenData } = useAuth();
  const menuLista = menu[tokenData?.tipoAcesso ?? ProviderEnum.Cidadao];
  return (
    <AsideCss>
      <nav>
        <List>
          {menuLista.map((m, i) => (
            <ListItem key={i}>
              <Link as={NavLink} to={link(m.idRota)}>
                <ListIcon as={m.icon} height="20px" width="20px" />
                {m.text}
              </Link>
            </ListItem>
          ))}
        </List>
      </nav>
    </AsideCss>
  );
}
