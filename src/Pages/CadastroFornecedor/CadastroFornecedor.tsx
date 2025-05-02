import { CadastroFornecedorProvider } from "./Context/CadastroFornecedorContext";
import WinzardFornecedor from "./WinzardFornecedor";

export default function CadastroFornecedor() {
  return (
    <CadastroFornecedorProvider>
      <WinzardFornecedor />
    </CadastroFornecedorProvider>
  );
}
