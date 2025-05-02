import useHttpRequest from "@/hooks/useHttpRequest";
import AdicionarDocumentoFornecedorDto from "../dto/adicionar.documento.fornecedor.dto";
import { CadastroFornecedor } from "../dto/cadastro.fornecedor";
import { DadosFinanceiroDto } from "../dto/dados.financeiro";
import { EnderecoDTO } from "../dto/endereco.dto";
import FornecedorRepresentante from "../dto/fornecedor.representante";
import FornecedorSegmento from "../dto/fornecedor.segmento";
import ParticiparFornecedorDto from "../dto/participar.forncedor.dto";
import DadosFinanceiro from "../types/DadosFinanceiro";
import Fornecedor from "../types/Fornecedor";
import { FornecedorDocumento } from "../types/FornecedorDocumetnos";
import { Representante } from "../types/Representante";
import { ResponseApi } from "../types/ResponseApi";
import { ResponseService, ServiceBase } from "./service.base";
export default class FornecedorService extends ServiceBase {
  protected getNameRecurso(): string {
    return "fornecedor";
  }

  async cadastrar(dados: CadastroFornecedor) {
    if (dados.id)
      return this.put<CadastroFornecedor, ResponseApi<Fornecedor>>("", dados);
    return this.post<CadastroFornecedor, ResponseApi<Fornecedor>>("", dados);
  }

  async rascunho() {
    return this.get<Fornecedor>("rascunho");
  }

  async atualizarEndereco(id: string, endereco: EnderecoDTO) {
    return this.patch<EnderecoDTO, ResponseApi<Fornecedor>>(
      `${id}/endereco`,
      endereco
    );
  }

  async adicionarDadoFinanceiro(
    id: string,
    dadoFinanceiro: DadosFinanceiroDto
  ) {
    return this.patch<DadosFinanceiroDto, ResponseService<DadosFinanceiro>>(
      `${id}/dados-financeiro`,
      dadoFinanceiro
    );
  }

  async deleteDadoFinanceiro(id: string, idDadoBancario: string) {
    await this.delete(`${id}/dados-financeiro/${idDadoBancario}`);
  }

  async adicionarRepresentante(
    id: string,
    representante: FornecedorRepresentante
  ) {
    return this.patch<FornecedorRepresentante, ResponseService<Representante>>(
      `${id}/representante`,
      representante
    );
  }

  async deleteRepresentante(id: string, idRepresntante: string) {
    await this.delete(`${id}/representante/${idRepresntante}`);
  }

  async adicionarSegmento(id: string, segmento: FornecedorSegmento) {
    return this.patch<FornecedorSegmento, ResponseService<Representante>>(
      `${id}/segmento`,
      segmento
    );
  }

  async adicionarDocumento(
    id: string,
    documento: AdicionarDocumentoFornecedorDto
  ) {
    return this.patch<
      AdicionarDocumentoFornecedorDto,
      ResponseService<FornecedorDocumento>
    >(`${id}/documentos`, documento);
  }

  async participarEdital(id: string, dados: ParticiparFornecedorDto) {
    return dados;
  }
}

export function useFornecedorService() {
  const http = useHttpRequest(false);
  return new FornecedorService(http);
}
