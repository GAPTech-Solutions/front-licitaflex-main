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
import { Mensagem, MensagemResponse } from "../types/Mensagem";
import EnviarMensagemDTO from "../dto/enviar.mensagem.dto";
import { EditalSalaDisputa, LoteSalaDisputa } from "../types/EditalSalaDisputa";
export default class SalaDisputaService extends ServiceBase {
  protected getNameRecurso(): string {
    return "sala-disputa";
  }
  async getEdital(editalId: string) {
    return this.get<EditalSalaDisputa>(`${editalId}/`);
  }

  async getLote(editalId: string, lote: string) {
    return this.get<LoteSalaDisputa>(`${editalId}/lote/${lote}`);
  }
  async getIdentificacaoFornecedor(editalId: string) {
    return this.get<string>(`${editalId}/identificacao-fornecedor`);
  }
  async messages(editalId: string) {
    return this.get<MensagemResponse[]>(`${editalId}/mensagens`);
  }

  async sendMessage(
    editalId: string,
    loteId: string,
    mensagem: EnviarMensagemDTO
  ) {
    return this.post<EnviarMensagemDTO, MensagemResponse>(
      `${editalId}/mensagens/${loteId}`,
      mensagem
    );
  }

  async iniciarDisputaLote(editalId: string, loteId: string) {
    return this.put(`${editalId}/lote/${loteId}/iniciar-disputa`, {});
  }

  async iniciarDesempate(editalId: string, loteId: string) {
    return this.put(`${editalId}/lote/${loteId}/iniciar-desempate`, {});
  }

  async iniciarNegociacao(editalId: string, loteId: string) {
    return this.put(`${editalId}/lote/${loteId}/iniciar-negociacao`, {});
  }

  async declararVencedor(editalId: string, loteId: string) {
    return this.put(`${editalId}/lote/${loteId}/declarar-vencedor`, {});
  }

  async enviarLance(editalId: string, loteId: string, lance: string) {
    return this.post(`${editalId}/lote/${loteId}/lance`, {
      lance: lance,
    });
  }
}

export function useSalaDisputaService() {
  const http = useHttpRequest(false);
  return new SalaDisputaService(http);
}
