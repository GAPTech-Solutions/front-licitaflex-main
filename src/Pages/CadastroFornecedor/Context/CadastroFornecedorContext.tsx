import { CadastroFornecedor } from "@/data/dto/cadastro.fornecedor";
import { EnderecoDTO } from "@/data/dto/endereco.dto";
import DadosFinanceiro from "@/data/types/DadosFinanceiro";
import Fornecedor from "@/data/types/Fornecedor";
import { FornecedorDocumento } from "@/data/types/FornecedorDocumetnos";
import { Representante } from "@/data/types/Representante";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

type CadastroFornecedorContextProps = {
  dadosIdentificacao?: Partial<CadastroFornecedor>;
  endereco?: EnderecoDTO;
  dadosFinanceiros: DadosFinanceiro[];
  representantes: Representante[];
  documentos: FornecedorDocumento[];
  id?: string;
  informarFornecedor: (dadosIdentificacao: Fornecedor) => void;
  adicionarDadosFinanceiro: (dados: DadosFinanceiro) => void;
  alterarPropriedade<T extends keyof Fornecedor>(
    prop: T,
    value: Fornecedor[T]
  ): void;
};

const defaultFunction = () => null;
const AuthContext = createContext<CadastroFornecedorContextProps>({
  informarFornecedor: defaultFunction,
  adicionarDadosFinanceiro: defaultFunction,
  dadosFinanceiros: [],
  representantes: [],
  documentos: [],
  alterarPropriedade() {
    return;
  },
});

export const CadastroFornecedorProvider = (props: PropsWithChildren) => {
  const [fornecedor, setFornecedor] = useState<Fornecedor>();
  const informarDadosIdentificacao = (dadosIdentificacao: Fornecedor) => {
    setFornecedor((state) => {
      return { ...state, ...dadosIdentificacao };
    });
  };

  function alterarPropriedade<T extends keyof Fornecedor>(
    prop: T,
    value: Fornecedor[T]
  ) {
    setFornecedor((state) => {
      const fornecedorNew = { ...state };
      fornecedorNew[prop] = value;

      return fornecedorNew as Fornecedor;
    });
  }
  const adicionarDadosFinanceiro = (dados: DadosFinanceiro) => {
    setFornecedor((state) => {
      const dadosFinanceiros = state?.dadosFinanceiros ?? [];
      dadosFinanceiros.push(dados);
      return { ...state!, dadosFinanceiros: dadosFinanceiros };
    });
  };

  const value: CadastroFornecedorContextProps = useMemo(() => {
    let dadosIdentificacao: CadastroFornecedor | undefined = undefined;
    if (fornecedor) {
      dadosIdentificacao = {
        id: fornecedor.id,
        celularFinanceiro: fornecedor.celularFinanceiro,
        emailFinanceiro: fornecedor.emailFinanceiro,
        nomeFantasia: fornecedor.nomeFantasia,
        pais: fornecedor.pais.id,
        celularLicitacao: fornecedor.celularLicitacao,
        emailLicitacao: fornecedor.emailLicitacao,
        razaoSocial: fornecedor.razaoSocial,
        tipoFornecedor: fornecedor.tipoFornecedor,
        cnpj: fornecedor.cnpj,
        cpf: fornecedor.cpf,
        inscricaoEstadual: fornecedor.inscricaoEstadual,
        pisNit: fornecedor.pisNit,
        isento:
          fornecedor.tipoFornecedor == 1 &&
          fornecedor.inscricaoEstadual == null,
      };
    }
    let endereco: EnderecoDTO | undefined;
    if (fornecedor?.endereco) {
      endereco = {
        bairro: fornecedor.endereco.bairro,
        cep: fornecedor.endereco.cep,
        codigoIbge: fornecedor.endereco.cidadeId,
        complemento: fornecedor.endereco.complemento,
        logradouro: fornecedor.endereco.logradouro,
        numero: fornecedor.endereco.numero,
        estado: fornecedor.endereco.estado,
      };
    }
    return {
      dadosIdentificacao: dadosIdentificacao,
      endereco: endereco,
      id: fornecedor?.id,
      informarFornecedor: informarDadosIdentificacao,
      adicionarDadosFinanceiro,
      alterarPropriedade,
      dadosFinanceiros: fornecedor?.dadosFinanceiros ?? [],
      representantes: fornecedor?.representantes ?? [],
      documentos: fornecedor?.documentos ?? [],
    };
  }, [fornecedor]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useCadastroFornecedor = () => {
  return useContext(AuthContext);
};
