import Logo from "@/Components/logo/Logo";
import AcoesBarra from "./Components/AcoesBarra";
import UsuarioDropDown from "./Components/UsuarioDropDown";
import { HeaderCss } from "./style";

export function Header() {
  return (
    <HeaderCss>
      <Logo height="48" />
      <AcoesBarra />
      <UsuarioDropDown />
    </HeaderCss>
  );
}
