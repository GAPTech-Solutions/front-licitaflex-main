import { TipoContaBancariaEnum } from "../enum/TipoContaBancariaEnum";
import Banco from "./Banco";

export default interface DadosFinanceiro {
  id: string;
  tipoConta: TipoContaBancariaEnum;
  agencia: string;
  numeroConta: string;
  banco: Banco;
  createdAt: string;
  updatedAt: string;
}
