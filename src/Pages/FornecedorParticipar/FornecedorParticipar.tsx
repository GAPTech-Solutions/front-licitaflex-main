import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import { Wizard } from "@/Components/winzard/wizard";
import { WizardContent } from "@/Components/winzard/wizardContent";

import FormDeclaracao from "./Forms/FormDeclaracao";
import FormDocumentos from "./Forms/FormDocumentos";
import FormLotesItens from "./Forms/FormLotesItens";
import { useFornecedorParticipar } from "./Context/FornecedorParticiparContext";

export default function FornecedorParticipar() {
  const { isLoading, edital, participacao } = useFornecedorParticipar();
  return (
    <SuspenseLicita isLoading={isLoading}>
      <Wizard data={participacao} navigationStepActive>
        <WizardContent
          nameLong="Declarações"
          nameShort="Declarações"
          description="Termos de participação do Edital"
        >
          <FormDeclaracao />
        </WizardContent>
        <WizardContent
          nameLong="Lotes e Itens"
          nameShort="Lotes e Itens"
          description="Cadastro de propostas"
        >
          <FormLotesItens edital={edital} />
        </WizardContent>
        <WizardContent
          nameLong="Documentos"
          nameShort="Documentos"
          description="Documentos para credênciamento"
        >
          <FormDocumentos />
        </WizardContent>
      </Wizard>
    </SuspenseLicita>
  );
}
