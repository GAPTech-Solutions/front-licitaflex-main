import { SuspenseLicita } from "@/Components/Suspense/SuspenseLicita";
import { Wizard } from "@/Components/winzard/wizard";
import { WizardContent } from "@/Components/winzard/wizardContent";
import { CadastroEditalDto } from "@/data/dto/cadastro.edital";

import FormArquivos from "./Forms/FormArquivos";
import FormDadosGerais from "./Forms/FormDadosGerais";
import FormDefinicoes from "./Forms/FormDefinicoes";
import FormEquipe from "./Forms/FormEquipe";
import FormLotes from "./Forms/FormLotes";
import FormOrigemRecursos from "./Forms/FormOrigemRecursos";
import FormRegistroPreco from "./Forms/FormRegistroPreco";
import { useCadastroEdital } from "./Context/CadastroEditalContext";

export default function CadastroEdital() {
  const { dadosEdital: data, isLoading, state } = useCadastroEdital();
  return (
    <SuspenseLicita isLoading={isLoading}>
      <Wizard
        data={{ ...((data ?? {}) as CadastroEditalDto) }}
        active={state}
        navigationStepActive={!!data?.id}
      >
        <WizardContent
          nameLong="Definição"
          nameShort="Definição"
          description="Escolha de modalide e amparo legal"
        >
          <FormDefinicoes />
        </WizardContent>
        <WizardContent
          nameLong="Equipe"
          nameShort="Equipe"
          description="Equipe responsável pelo processo"
        >
          <FormEquipe />
        </WizardContent>
        <WizardContent
          nameLong="Origem dos Recursos"
          nameShort="Recursos"
          description="Controle de convênio/transferência voluntária da união"
        >
          <FormOrigemRecursos />
        </WizardContent>
        <WizardContent
          nameLong="Registro de preços"
          nameShort="Registro Preço"
          description="Registro de preços, Prazos de validade e carona"
        >
          <FormRegistroPreco />
        </WizardContent>
        <WizardContent
          nameLong="Dados Gerais"
          nameShort="Dados"
          description="Dados do edital, segmentos de fornecimento e anexo"
        >
          <FormDadosGerais />
        </WizardContent>
        <WizardContent
          isVisible={!data?.id}
          nameLong="Arquivos e Anexos"
          nameShort="Arquivos"
          description="Anexe o seu Edital e outros arquivos"
        >
          <FormArquivos />
        </WizardContent>
        <WizardContent
          isVisible={!data?.id}
          nameLong="Lotes e Itens"
          nameShort="Lotes"
          description="Adicione Lotes e itens no processo"
        >
          <FormLotes />
        </WizardContent>
      </Wizard>
    </SuspenseLicita>
  );
}
