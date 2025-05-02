import { Wizard } from "@/Components/winzard/wizard";
import { WizardContent } from "@/Components/winzard/wizardContent";
import FormDadosEndereco from "./Forms/FormDadosEndereco";
import FormEntidadeRegioes from "./Forms/FormEntidadeRegioes";
import FormDadosIdentificacao from "./Forms/FormDadosIdentificacao";
import useCadastroEntidade from "./useCadastroEntidade";
import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";

export default function WinzardEntidade() {
  const { isLoading } = useCadastroEntidade();

  return (
    <SuspenseLicita isLoading={isLoading}>
      <Wizard navigationStepActive>
        <WizardContent
          nameLong="Dados Identificação"
          nameShort="Dados"
          description="Identificação da entidade"
        >
          <FormDadosIdentificacao />
        </WizardContent>
        <WizardContent
          nameLong="Endereço"
          nameShort="Endereço"
          description="Endereço físico da empresa"
        >
          <FormDadosEndereco />
        </WizardContent>
        <WizardContent
          nameLong="Cidades em Atuação"
          nameShort="Atuação"
          description="Cidades em que a entidade pública atua"
        >
          <FormEntidadeRegioes />
        </WizardContent>
      </Wizard>
    </SuspenseLicita>
  );
}
