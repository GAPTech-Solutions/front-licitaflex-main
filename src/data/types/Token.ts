import { ProviderEnum } from "../enum/ProviderEnum";

export interface Token {
  iat: number;
  exp: number;
  roles: string[];
  email: string;
  ip: string;
  id: string;
  nome: string;
  tipoAcesso: ProviderEnum;
  providerId: string;
  entidades: { id: string; nome: string }[];
  fornecedores: { id: string; nome: string }[];
}
