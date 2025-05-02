import useModal, {
  PropsModalLicitaflex as PropsModalLicitaFlex,
} from "@/Components/Modal/Conteudo/useModal";
import { useEditalService } from "@/data/services/edital.sevice";
import { Edital } from "@/data/types/Edital";
import useQuery from "@/hooks/requests/useQuery";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import FormSolicitacoes from "./Form/FormSolicitacoes";
import ModalContent from "@/Components/Modal/Conteudo/ModalContent";
import { useAuth } from "@/Context/AuthContext";
import { ProviderEnum } from "@/data/enum/ProviderEnum";
import FormRespostaSolicitacoes from "./Form/FormRespostaSolicitacoes";
import { Solicitacoes } from "@/data/types/Solicitacoes";

type LicitacaoContextProps = {
  edital?: Edital;
  isLoading: boolean;
  linkParticipar: string;
  propsModal: PropsModalLicitaFlex;
  modalSolicitacaoClick: (tipo: number) => void;
  modalRespostaSolicitacaoClick: (solicitacao: Solicitacoes) => void;
  ePregoeiro?: boolean;
};
const LicitacaoContext = createContext<LicitacaoContextProps>({
  isLoading: false,
  linkParticipar: "",
  modalSolicitacaoClick(tipo) {
    return;
  },
  modalRespostaSolicitacaoClick(solicitacao) {
    return;
  },
  propsModal: {} as PropsModalLicitaFlex,
  edital: undefined,
});

export const LicitacaoProvider = (props: PropsWithChildren) => {
  const { link } = useNavigateLicitaFlex();
  const editalService = useEditalService();
  const { idEdital } = useParams();
  const { close, open, props: propsModal } = useModal({ size: "2xl" });
  const { tokenData } = useAuth();

  const ePregoeiro = tokenData?.tipoAcesso == ProviderEnum.Entidade;

  const { data, isLoading } = useQuery({
    async fetchFn() {
      return await (
        await editalService.obterEdital(idEdital!)
      ).dados;
    },
    options: {},
  });

  const linkParticipar = useMemo(() => {
    return link("participar-licitacao", { idEdital: idEdital! });
  }, [idEdital]);

  const modalSolicitacaoClick = (tipo: number) => {
    const titleTipo = tipo === 1 ? "Esclarecimento" : "Impulgnação";
    open({
      title: `Solicitar ${titleTipo}`,
      content: {
        component: FormSolicitacoes,
        props: { close, tipoSolicitacao: tipo, idEdital: idEdital! },
      },
    });
  };

  const modalRespostaSolicitacaoClick = (solicitacao: Solicitacoes) => {
    const titleTipo =
      solicitacao.tipoSolicitacao === 1 ? "Esclarecimento" : "Impulgnação";
    open({
      title: `Responder ${titleTipo}`,
      content: {
        component: FormRespostaSolicitacoes,
        props: {
          close,
          tipoSolicitacao: solicitacao.tipoSolicitacao,
          idEdital: idEdital!,
          solicitacao,
        },
      },
    });
  };

  return (
    <LicitacaoContext.Provider
      value={{
        isLoading: isLoading,
        linkParticipar: linkParticipar,
        modalSolicitacaoClick: modalSolicitacaoClick,
        modalRespostaSolicitacaoClick,
        propsModal,
        edital: data,
        ePregoeiro,
      }}
    >
      <ModalContent {...propsModal} />
      {props.children}
    </LicitacaoContext.Provider>
  );
};

export const useLicitacao = () => {
  return useContext(LicitacaoContext);
};
