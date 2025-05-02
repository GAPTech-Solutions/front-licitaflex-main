import { useMetaDadosService } from "@/data/services/meta.dados.sevice";
import Banco from "@/data/types/Banco";
import { Cidade } from "@/data/types/Cidade";
import NaturezaJuridica from "@/data/types/NaturezaJuridica";
import Pais from "@/data/types/Pais";
import useQuery from "@/hooks/requests/useQuery";
import useSessionStorage from "@/hooks/useSessionStorage";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
type MetaDados = {
  cidades: Cidade[];
  paises: Pais[];
  bancos: Banco[];
  naturezaJuridica: NaturezaJuridica[];
};
type MetaDadosContextProps = {
  estados: string[];
  isLoading: boolean;
} & MetaDados;
const MetaDadosContext = createContext<MetaDadosContextProps>({
  cidades: [],
  paises: [],
  bancos: [],
  estados: [],
  naturezaJuridica: [],
  isLoading: true,
});

export const MetaDadosProvider = (props: PropsWithChildren) => {
  const metaDadosService = useMetaDadosService();
  const [metaDados, setMetaDados] = useSessionStorage<MetaDados>("meta-dados");

  const { isLoading } = useQuery({
    fetchFn: () => metaDadosService.obterMetaDados(),
    options: {
      onSuccess(data) {
        setMetaDados(data?.dados ?? null);
      },
    },
  });
  const estados = useMemo(() => {
    if (!metaDados) return [];

    return metaDados.cidades.reduce((unicos, c) => {
      const retorno = [...unicos];
      if (retorno.includes(c.estado)) return retorno;
      retorno.push(c.estado);
      return retorno;
    }, [] as string[]);
  }, [metaDados]);

  const obterCidades = () => metaDados?.cidades ?? [];

  const obterEstados = () => estados;
  const obterBancos = () => metaDados?.bancos ?? [];
  const obterPaises = () => metaDados?.paises ?? [];
  const obterNaturezaJuridicas = () => metaDados?.naturezaJuridica ?? [];

  const value: MetaDadosContextProps = useMemo(() => {
    return {
      bancos: obterBancos(),
      paises: obterPaises(),
      cidades: obterCidades(),
      estados: obterEstados(),
      naturezaJuridica: obterNaturezaJuridicas(),
      isLoading,
    };
  }, [metaDados]);

  return (
    <MetaDadosContext.Provider value={value}>
      {props.children}
    </MetaDadosContext.Provider>
  );
};

export const useMetaDado = () => {
  return useContext(MetaDadosContext);
};

export const useCidades = () => {
  const context = useContext(MetaDadosContext);
  const obterCidadesPorEstado = (estado: string) => {
    return context.cidades.filter((c) => c.estado == estado);
  };

  return { cidades: context.cidades, obterCidadesPorEstado };
};

export const useBancos = () => {
  return useContext(MetaDadosContext).bancos;
};

export const useEstados = () => {
  return useContext(MetaDadosContext).estados;
};

export const usePaises = () => {
  const paises = useContext(MetaDadosContext).paises;
  const paisesFormatado = useMemo(() => {
    const brasil = paises.find((p) => p.id == "1058")!;
    const demaisPaises = paises.filter((p) => p != brasil);
    const retorno = [brasil, ...demaisPaises];
    return retorno;
  }, [paises]);
  return paisesFormatado;
};

export const useNaturezaJuridica = () => {
  return useContext(MetaDadosContext).naturezaJuridica;
};
