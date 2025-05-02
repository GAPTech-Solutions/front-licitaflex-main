import { Edital } from "./Edital";
import { Endereco } from "./Endereco";
import { EquipeEdital } from "./EquipeEdital";
import NaturezaJuridica from "./NaturezaJuridica";
import { Regiao } from "./Regiao";
import { Usuario } from "./Usuario";

export interface EntidadePublica {
  nome: string;
  cnpj: string;
  endereco: Endereco;
  usuarioCadastro: Usuario;
  naturezaJuridica: NaturezaJuridica;
  editais: Edital[];
  regiao: Regiao[];
  id: string;
  createdAt: string;
  updatedAt: string;
  usuariosPregoeiros: EquipeEdital[];
  usuariosAutoridadeSuperior: EquipeEdital[];
  usuariosAuxiliar: EquipeEdital[];
}
