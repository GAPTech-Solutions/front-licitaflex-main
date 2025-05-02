import useHttpRequest from "@/hooks/useHttpRequest";
import AdicionarAnexoEditalDto from "../dto/adicionar.anexo.edital.dto";
import { EditalSolicitacaoDto } from "../dto/edital.solicitacao.dto";
import ParticiparFornecedorDto from "../dto/participar.forncedor.dto";
import { Documento } from "../types/Documento";
import { Edital } from "../types/Edital";
import { FornecedorParticipacao } from "../types/FornecedorParticipacao";
import { Lote } from "../types/Lote";
import { ResponseApi } from "../types/ResponseApi";
import { ServiceBase } from "./service.base";
import { Solicitacoes } from "../types/Solicitacoes";
export default class EditalService extends ServiceBase {
  protected getNameRecurso(): string {
    return "edital";
  }

  async obterTodos() {
    return this.get<Edital[]>("");
  }
  async obterEdital(id: string) {
    const edital = this.get<Edital>(id);
    return edital;
  }
  async excluirEdital(id: string): Promise<void> {
    await this.delete(id);
  }

  async adicionarAnexo(id: string, anexo: AdicionarAnexoEditalDto) {
    return this.patch<AdicionarAnexoEditalDto, ResponseApi<Documento>>(
      `${id}/anexo`,
      anexo
    );
  }

  async salvarLote(id: string, lote: Lote) {
    return this.patch<Lote>(`${id}/lote`, lote);
  }

  async removerLote(id: string, idLote: string) {
    await this.delete(`${id}/lote/${idLote}`);
  }

  async participarEdital(id: string, dados: ParticiparFornecedorDto) {
    return this.post<
      ParticiparFornecedorDto,
      ResponseApi<FornecedorParticipacao>
    >(`${id}/participar`, dados);
  }

  async obterParticipacaoEdital(id: string) {
    return this.get<FornecedorParticipacao>(`${id}/participar`);
  }

  async solicitacaoEdital(id: string, dados: EditalSolicitacaoDto) {
    return this.post<EditalSolicitacaoDto, ResponseApi<EditalSolicitacaoDto>>(
      `${id}/solicitacao`,
      dados
    );
  }

  async respostasolicitacaoEdital(
    id: string,
    idSolicitacao: string,
    dados: EditalSolicitacaoDto
  ) {
    return this.post<EditalSolicitacaoDto, ResponseApi<Solicitacoes>>(
      `${id}/solicitacao/${idSolicitacao}`,
      dados
    );
  }

  async publicarEdital(id: string) {
    return this.post<null, ResponseApi<Edital>>(`${id}/publicar`, null);
  }

  async iniciarDisputa(id: string) {
    return this.post<null, ResponseApi<Edital>>(`${id}/iniciar-disputa`, null);
  }
}

export function useEditalService() {
  const http = useHttpRequest(false);
  return new EditalService(http);
}
