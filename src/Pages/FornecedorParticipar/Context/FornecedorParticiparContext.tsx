import { CadastroEditalDto } from "@/data/dto/cadastro.edital";
import ParticiparFornecedorDto from "@/data/dto/participar.forncedor.dto";
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
import { useParams } from "react-router-dom";

type FornecedorParticiparContext = {
  idEdital?: string;
  edital?: Edital;
  participacao: ParticiparFornecedorDto;
  isLoading: boolean;
};

const defaultFunction = () => null;
const AuthContext = createContext<FornecedorParticiparContext>({
  isLoading: false,
  participacao: {} as ParticiparFornecedorDto,
});

export const FornecedorParticiparProvider = (props: PropsWithChildren) => {
  const { idEdital } = useParams();
  const editalService = useEditalService();
  const { data, isLoading } = useQuery({
    fetchFn: async () => {
      const edital = editalService.obterEdital(idEdital!);
      const participacao = editalService.obterParticipacaoEdital(idEdital!);
      return Promise.all([edital, participacao]);
    },
  });

  const edital = data?.[0]?.dados;

  const participacao: ParticiparFornecedorDto = useMemo(() => {
    const participacaoDados = data?.[1]?.dados;
    if (!participacaoDados) return {} as ParticiparFornecedorDto;
    return {
      atendeRequisitosHabilitacao:
        participacaoDados.atendeRequisitosHabilitacao,
      cienteCondicoesEdital: participacaoDados.cienteCondicoesEdital,
      condicoesTrabalho: participacaoDados.condicoesTrabalho,
      documentos: participacaoDados.documentos.map((d) => ({
        arquivo: d.nome,
        tipoDocumento: d.tipoDocumento,
        link: d.caminho,
        nomeArquivo: d.nomeOriginal,
      })),
      enquadramento: participacaoDados.enquadramento,
      entendimentoCustosTrabalhista:
        participacaoDados.entendimentoCustosTrabalhista,
      lotes: participacaoDados.items.map((i) => ({
        descricao: i.descricao,
        fabricante: i.fabricante,
        itemId: i.itemId,
        marca: i.marca,
        valor: i.valor,
        modeloVersao: i.modeloVersao,
      })),
      naoIncorreCondicoes: participacaoDados.naoIncorreCondicoes,
      propostaEmConformidade: participacaoDados.propostaEmConformidade,
      reservaCargoDeficiencia: participacaoDados.reservaCargoDeficiencia,
    };
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        idEdital,
        isLoading: isLoading,
        edital: edital,
        participacao: participacao,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useFornecedorParticipar = () => {
  return useContext(AuthContext);
};
