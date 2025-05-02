import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import { Wizard } from "@/Components/winzard/wizard";
import { WizardContent } from "@/Components/winzard/wizardContent";
import FormDadosEndereco from "./Forms/FormDadosEndereco";
import FormDadosFinanceiros from "./Forms/FormDadosFinanceiros";
import FormDadosIdentificacao from "./Forms/FormDadosIdentificacao";
import FormDocumentos from "./Forms/FormDocumentos";
import FormRepresentanteLegal from "./Forms/FormRepresentanteLegal";
import useCadastroFornecedor from "./useCadastroFornecedor";
export default function WinzardFornecedor() {
  const { isLoading } = useCadastroFornecedor();
  return (
    <SuspenseLicita isLoading={isLoading}>
      <Wizard navigationStepActive>
        <WizardContent
          nameLong="Dados Identificação"
          nameShort="Dados"
          description="Identificação do fornecedor"
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
          nameLong="Dados Bancários"
          nameShort="Banco"
          description="Informações financeiras do fornecedor"
        >
          <FormDadosFinanceiros />
        </WizardContent>
        <WizardContent
          nameLong="Representante legal"
          nameShort="Responsável"
          description="Usuários que responderão pela empresa"
        >
          <FormRepresentanteLegal />
        </WizardContent>
        <WizardContent
          nameLong="Segmentos de atuação"
          nameShort="Segmentos"
          description="Os segmentos que a empresa atua"
        >
          Os segmentos que a empresa atua
        </WizardContent>
        <WizardContent
          nameLong="Documentos Fornecedor"
          nameShort="Documentos"
          description="Documentos do fornecedor para validação"
        >
          <FormDocumentos />
        </WizardContent>
      </Wizard>
    </SuspenseLicita>
  );
}
