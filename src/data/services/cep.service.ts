import Axios from "axios";
import { Endereco } from "../types/Endereco";
import { ViaCepAddress } from "../types/ViaCepAddress";
import { ServiceBase } from "./service.base";

export default class CepService extends ServiceBase {
  protected getNameRecurso(): string {
    return "https://viacep.com.br/ws/";
  }

  async addressByZipCode(zipCode: string) {
    const address = await this.get<ViaCepAddress, ViaCepAddress>(
      `${zipCode}/json`
    );
    return {
      cep: address.cep,
      cidade: address.localidade,
      estado: address.uf,
      bairro: address.bairro,
      logradouro: address.logradouro,
      cidadeId: Number(address.ibge),
    } as Endereco;
  }
}

export function useViaCep() {
  return new CepService(Axios);
}
