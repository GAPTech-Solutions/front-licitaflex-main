import useHttpRequest from "@/hooks/useHttpRequest";
import { BuscaDto } from "../dto/busca.dto";
import Banco from "../types/Banco";
import { Cidade } from "../types/Cidade";
import NaturezaJuridica from "../types/NaturezaJuridica";
import Pais from "../types/Pais";
import { Segmento } from "../types/Segmento";
import { ServiceBase } from "./service.base";
export default class MetaDadosService extends ServiceBase {
  protected getNameRecurso(): string {
    return "";
  }

  async obterMetaDados() {
    const metaDados = this.get<{
      bancos: Banco[];
      cidades: Cidade[];
      paises: Pais[];
      naturezaJuridica: NaturezaJuridica[];
    }>("meta-dados");
    return metaDados;
  }

  async segmentos(busca: BuscaDto) {
    return this.get<Segmento[]>("segmentos", { params: busca });
  }
}

export function useMetaDadosService() {
  const http = useHttpRequest(true);
  return new MetaDadosService(http);
}
