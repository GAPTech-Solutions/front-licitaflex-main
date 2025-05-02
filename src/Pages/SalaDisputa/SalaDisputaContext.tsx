import useQuery from "@/hooks/requests/useQuery";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { ProviderEnum } from "@/data/enum/ProviderEnum";
import { NatsConnection, StringCodec, connect } from "nats.ws";
import { useSalaDisputaService } from "@/data/services/sala.disputa.sevice";
import {
  EditalSalaDisputa,
  LoteSalaDisputa,
} from "@/data/types/EditalSalaDisputa";
import { NotificacaoLote } from "@/data/types/NotificacaoLote";
import { object } from "yup";

type SalaDisputaContextProps = {
  edital?: EditalSalaDisputa;
  isLoading: boolean;
  ePregoeiro?: boolean;
  loteAtivo?: string;
  lotes: Record<string, LoteSalaDisputa>;
  lote?: LoteSalaDisputa;
  fornecedorId?: string;
  setLoteAtivo: Dispatch<SetStateAction<string>>;
  notificacaoOn<T>(type: string, callback: (data: T) => void): void;
};
const SalaDisputaContext = createContext<SalaDisputaContextProps>({
  isLoading: false,
  edital: undefined,
  lotes: {},
  setLoteAtivo: (value: string | ((prevState: string) => string)) => {
    return;
  },
  notificacaoOn(type, callback) {
    return;
  },
});

export const SalaDisputaProvider = (props: PropsWithChildren) => {
  const salaDisputaService = useSalaDisputaService();
  const [loteAtivo, setLoteAtivo] = useState<string>("");
  const { idEdital } = useParams();

  const { tokenData } = useAuth();
  const connection = useRef<Promise<NatsConnection>>();
  const notifications = useRef<Record<string, (data: any) => void>>({});
  const [fornecedorId, setFornecedorId] = useState<string | undefined>();
  const [lotes, setLotes] = useState<Record<string, LoteSalaDisputa>>({});

  async function initEvent(edital: string) {
    const nc = await connect({
      servers: import.meta.env.VITE_HUB_MESSAGE,
    });
    console.log(`connected to ${nc.getServer()}`);
    // const done = nc.closed();
    // // do something with the connection

    // // close the connection
    // await nc.close();
    // // check if the close was OK
    // const err = await done;
    // if (err) {
    //   console.log(`error closing:`, err);
    // }
    const sc = StringCodec();
    // create a simple subscriber and iterate over messages
    // matching the subscription
    const sub = nc.subscribe(edital);
    (async () => {
      for await (const m of sub) {
        const objectData = JSON.parse(sc.decode(m.data));
        notifications.current[objectData.type]?.(objectData?.message);
      }
    })();
    return nc;
  }

  function notificacaoOn<T>(type: string, calback: (data: T) => void) {
    notifications.current[type] = calback;
  }

  const ePregoeiro = tokenData?.tipoAcesso == ProviderEnum.Entidade;

  const {} = useQuery({
    async fetchFn() {
      if (tokenData?.tipoAcesso != ProviderEnum.Fornecedor) {
        return undefined;
      }
      return await (
        await salaDisputaService.getIdentificacaoFornecedor(idEdital!)
      ).dados;
    },
    options: {
      onSuccess(data) {
        if (!data) return;
        setFornecedorId(data);
      },
    },
  });

  const { data, isLoading } = useQuery({
    async fetchFn() {
      return await (
        await salaDisputaService.getEdital(idEdital!)
      ).dados;
    },
    options: {
      onSuccess(data) {
        if (!data) return;
        connection.current = initEvent(data.id);

        setLotes((l) => {
          const lotesNew = { ...l };
          for (const lote of data.lotes) {
            lotesNew[lote.id] = lote;
          }
          return lotesNew;
        });
        setLoteAtivo(data.lotes?.[0].id);
      },
      onError(error) {
        console.log(error);
      },
    },
  });

  const atualizarLote = async (idEdital?: string, id?: string) => {
    if (!idEdital || !id) {
      return;
    }
    try {
      const lote = (await salaDisputaService.getLote(idEdital, id)).dados;

      setLotes((l) => {
        return { ...l, [id]: { ...lote } };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const lote = lotes[loteAtivo];

  useEffect(() => {
    notificacaoOn("CRONOMETRO", (data: NotificacaoLote) => {
      atualizarLote(idEdital, data.loteId);
    });

    notificacaoOn("LOTE", (data: NotificacaoLote) => {
      atualizarLote(idEdital, data.loteId);
    });
  });

  const edital: EditalSalaDisputa = {
    ...data,
    lotes: Object.values(lotes),
  } as EditalSalaDisputa;

  return (
    <SalaDisputaContext.Provider
      value={{
        isLoading: isLoading,
        edital: edital,
        lote: lote,
        lotes,
        ePregoeiro,
        loteAtivo,
        setLoteAtivo,
        notificacaoOn,
        fornecedorId,
      }}
    >
      {props.children}
    </SalaDisputaContext.Provider>
  );
};

export const useSalaDisputa = () => {
  return useContext(SalaDisputaContext);
};
