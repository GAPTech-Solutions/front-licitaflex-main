import useHttpRequest from "@/hooks/useHttpRequest";
import { CadastroEntidade } from "../dto/cadastro.entidade";
import { EnderecoDTO } from "../dto/endereco.dto";
import { EntidadePublica } from "../types/EntidadePublica";
import { ResponseApi } from "../types/ResponseApi";
import { EquipeEdital } from "../types/EquipeEdital";
import { ServiceBase } from "./service.base";
import AdicionarUsuarioEntidadeDto from "../dto/adicionar.usuario.entidade.dto";
import { CadastroEditalDto } from "../dto/cadastro.edital";
import { Edital } from "../types/Edital";
import { Segmento } from "../types/Segmento";
export default class EntidadePublicaService extends ServiceBase {
  protected getNameRecurso(): string {
    return "entidade-publica";
  }

  async entidadeLogada() {
    return this.get<EntidadePublica>("");
  }

  async cadastrar(dados: CadastroEntidade) {
    if (dados.id)
      return this.put<CadastroEntidade, ResponseApi<EntidadePublica>>(
        "",
        dados
      );
    return this.post<CadastroEntidade, ResponseApi<EntidadePublica>>("", dados);
  }

  async rascunho() {
    return this.get<EntidadePublica>("rascunho");
  }

  async enviarAvaliacao(id: string) {
    return this.put<null, void>(`${id}/enviar-avaliacao`, null);
  }

  async atualizarEndereco(id: string, endereco: EnderecoDTO) {
    return this.put<EnderecoDTO, ResponseApi<EntidadePublica>>(
      `${id}/endereco`,
      endereco
    );
  }

  async usuarios() {
    return this.get<EquipeEdital[]>("usuarios");
  }

  async adicionarUsuario(dados: AdicionarUsuarioEntidadeDto) {
    return this.put<AdicionarUsuarioEntidadeDto>("usuarios", dados);
  }

  async adicionarEdital(dados: CadastroEditalDto) {
    const segmentos = (dados.segmentos?.map((s) => s.id) ??
      []) as unknown as Segmento[];
    const edital = { ...dados, segmentos };

    if (edital.id) {
      return this.put<CadastroEditalDto, ResponseApi<Edital>>("edital", edital);
    }
    return this.post<CadastroEditalDto, ResponseApi<Edital>>("edital", edital);
  }

  async licitacoes() {
    return this.get<Edital[]>("editais");
  }
}

export function useEntidadePublicaService() {
  const http = useHttpRequest(false);
  return new EntidadePublicaService(http);
}
