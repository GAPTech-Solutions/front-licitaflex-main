import ParticiparFornecedorLotesDto from "./participar.fornecedor.lotes.dto";

export default interface ParticiparFornecedorDto {
  naoIncorreCondicoes: boolean;

  atendeRequisitosHabilitacao: boolean;

  reservaCargoDeficiencia: boolean;

  propostaEmConformidade: boolean;

  entendimentoCustosTrabalhista: boolean;

  cienteCondicoesEdital: boolean;

  condicoesTrabalho: boolean;

  enquadramento: number;

  lotes: ParticiparFornecedorLotesDto[];

  documentos: {
    arquivo: string;
    tipoDocumento: number;
    nomeArquivo?: string;
    link?: string;
  }[];
}
