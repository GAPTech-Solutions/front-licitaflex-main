import { CadastroEntidadeProvider } from "./Context/CadastroEntidadeContext";
import WinzardEntidade from "./WinzardEntidade";

export default function CadastroEntidade() {
  return (
    <CadastroEntidadeProvider>
      <WinzardEntidade />
    </CadastroEntidadeProvider>
  );
}
