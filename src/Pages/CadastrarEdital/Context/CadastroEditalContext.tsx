import { CadastroEditalDto } from "@/data/dto/cadastro.edital";
import { useEditalService } from "@/data/services/edital.sevice";
import { Edital } from "@/data/types/Edital";
import { ResponseApi } from "@/data/types/ResponseApi";
import useQuery from "@/hooks/requests/useQuery";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";

type CadastroEditalContextProps = {
  id?: string;
  edital?: Edital;
  dadosEdital?: CadastroEditalDto;
  isLoading: boolean;
  state?: number;
};

const defaultFunction = () => null;
const AuthContext = createContext<CadastroEditalContextProps>({
  isLoading: false,
});

export const CadastroEditalProvider = (props: PropsWithChildren) => {
  const { idEdital } = useParams();
  const { state } = useLocation();

  const editalService = useEditalService();
  const { data, isLoading } = useQuery<ResponseApi<Edital> | undefined>(
    {
      fetchFn: async () => {
        if (!idEdital) return;
        return editalService.obterEdital(idEdital!);
      },
    },
    [idEdital]
  );

  const dadosEdital = useMemo(() => {
    if (!data?.dados) return;
    const edital = data.dados;

    return {
      amparoLegal: edital.amparoLegal,
      autoridadeSuperior: edital.autoridadeSuperior.id,
      convenio: edital.convenioRecurso != null,
      convenioRecurso: edital.convenioRecurso,
      dataInicioDisputa: edital.dataInicioDisputa.parseDateIso(),
      dataLimiteImpugnacao: edital.dataLimiteImpugnacao.parseDateIso(),
      dataPublicacaoDiario: edital.dataPublicacaoDiario.parseDateIso(),
      equipeApoio: edital.equipeDeApoio.map((e) => e.id),
      formatoLance: edital.formatoLance,
      modalidade: edital.modalidade,
      modoDisputa: edital.modoDisputa,
      numeroCasasDecimaisLance: edital.numeroCasasDecimaisLance,
      numeroDotacaoOrcamentaria: edital.numeroDotacaoOrcamentaria,
      numeroPregao: edital.numeroPregao,
      numeroProcesso: edital.numeroProcesso,
      objetoEdital: edital.objetoEdital,
      ordemFase: edital.ordemFase,
      pregoeiro: edital.pregoeiro.id,
      registroPreco: edital.registroPreco,
      tipoIntervalo: edital.tipoIntervalo,
      id: edital.id,
      origemRecurso: edital.origemRecurso,
      permitidoCarona: edital.permitidoCarona,
      prazoValidade: edital.prazoValidade,
      tipoTaxa: edital.tipoTaxa,
      lotes: edital.lotes,
      segmentos: edital.segmentos,
      documentos: edital.documentos,
    } as CadastroEditalDto;
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        dadosEdital: dadosEdital,
        id: idEdital,
        isLoading: isLoading,
        edital: data?.dados,
        state: state ?? undefined,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useCadastroEdital = () => {
  return useContext(AuthContext);
};
