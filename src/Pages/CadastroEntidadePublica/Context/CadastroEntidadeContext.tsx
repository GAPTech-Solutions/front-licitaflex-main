import { CadastroEntidade } from "@/data/dto/cadastro.entidade";
import { EnderecoDTO } from "@/data/dto/endereco.dto";
import { EntidadePublica } from "@/data/types/EntidadePublica";
import { Regiao } from "@/data/types/Regiao";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

type CadastroEntidadeContextProps = {
  dadosIdentificacao?: Partial<CadastroEntidade>;
  endereco?: EnderecoDTO;
  id?: string;
  regiao: Regiao[];
  informarEntidadePublica: (dadosIdentificacao: EntidadePublica) => void;
  alterarPropriedade<T extends keyof EntidadePublica>(
    prop: T,
    value: EntidadePublica[T]
  ): void;
};

const defaultFunction = () => null;
const CadastroEntidadeContext = createContext<CadastroEntidadeContextProps>({
  informarEntidadePublica: defaultFunction,
  regiao: [],
  alterarPropriedade() {
    return;
  },
});

export const CadastroEntidadeProvider = (props: PropsWithChildren) => {
  const [entidadePublica, setEntidadePublica] = useState<EntidadePublica>();
  const informarEntidadePublica = (entidadePublica: EntidadePublica) => {
    setEntidadePublica((state) => {
      return { ...state, ...entidadePublica };
    });
  };
  function alterarPropriedade<T extends keyof EntidadePublica>(
    prop: T,
    value: EntidadePublica[T]
  ) {
    setEntidadePublica((state) => {
      let fornecedorNew = { ...state };
      if (Array.isArray(value)) {
        let values = [] as unknown as EntidadePublica[T];
        if (fornecedorNew[prop]) {
          values = fornecedorNew[prop] as EntidadePublica[T];
        }
        fornecedorNew = {
          ...fornecedorNew,
          [prop]: values,
        };
      } else {
        fornecedorNew[prop] = value;
      }

      return fornecedorNew as EntidadePublica;
    });
  }

  const value: CadastroEntidadeContextProps = useMemo(() => {
    let dadosIdentificacao: CadastroEntidade | undefined = undefined;
    if (entidadePublica) {
      dadosIdentificacao = {
        id: entidadePublica.id,
        cnpj: entidadePublica.cnpj,
        nome: entidadePublica.nome,
        naturezaJuridica: entidadePublica.naturezaJuridica.id,
        regiao: entidadePublica.regiao.map((r) => r.id),
      };
    }
    let endereco: EnderecoDTO | undefined;
    if (entidadePublica?.endereco) {
      endereco = {
        bairro: entidadePublica.endereco.bairro,
        cep: entidadePublica.endereco.cep,
        codigoIbge: entidadePublica.endereco.cidadeId,
        complemento: entidadePublica.endereco.complemento,
        logradouro: entidadePublica.endereco.logradouro,
        numero: entidadePublica.endereco.numero,
        estado: entidadePublica.endereco.estado,
      };
    }
    return {
      alterarPropriedade,
      informarEntidadePublica,
      endereco,
      dadosIdentificacao,
      id: entidadePublica?.id,
      regiao: entidadePublica?.regiao ?? [],
    };
  }, [entidadePublica]);

  return (
    <CadastroEntidadeContext.Provider value={value}>
      {props.children}
    </CadastroEntidadeContext.Provider>
  );
};

export const useCadastroEntidadeContext = () => {
  return useContext(CadastroEntidadeContext);
};
