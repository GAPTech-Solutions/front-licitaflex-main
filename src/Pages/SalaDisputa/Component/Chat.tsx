import BallonChat from "@/Components/chat/BallonChat";
import ContainerChat from "@/Components/chat/ContainerChat";
import { IconMessage } from "@/Components/icons/iconMessage";
import { IconSendMessage } from "@/Components/icons/iconSendMessage";
import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChatCss } from "../style";
import useQuery from "@/hooks/requests/useQuery";
import { useSalaDisputa } from "../SalaDisputaContext";
import { useSalaDisputaService } from "@/data/services/sala.disputa.sevice";
import EnviarMensagemDTO from "@/data/dto/enviar.mensagem.dto";
import useMutation from "@/hooks/requests/useMutation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/Context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { Mensagem, MensagemResponse } from "@/data/types/Mensagem";

export default function Chat() {
  const { edital, loteAtivo, notificacaoOn, fornecedorId } = useSalaDisputa();
  const { tokenData } = useAuth();
  const [message, setMessage] = useState<MensagemResponse[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EnviarMensagemDTO>({
    defaultValues: {
      message: "",
      typeMessage: 1,
    },
  });
  const { mutate } = useMutation({
    mutateFn(values: EnviarMensagemDTO) {
      return salaDisputaService.sendMessage(edital!.id, loteAtivo!, values);
    },
    options: {
      onSuccess() {
        setValue("message", "");
      },
    },
  });

  function getAutor(
    mensagem: MensagemResponse
  ): "voce" | "pregoeiro" | "fornecedor" {
    if (
      mensagem.fornecedorId == fornecedorId ||
      mensagem.entidadePublicaId == tokenData?.providerId
    ) {
      return "voce";
    }
    if (mensagem.enviadoFornecedor) {
      return "fornecedor";
    }
    return "pregoeiro";
  }

  function getAutorName(mensagem: MensagemResponse): string {
    if (
      mensagem.fornecedorId == fornecedorId ||
      mensagem.entidadePublicaId == tokenData?.providerId
    ) {
      return "Você";
    }
    return mensagem.autor;
  }

  const sendMessageSubmit = handleSubmit(mutate);
  const salaDisputaService = useSalaDisputaService();
  const {} = useQuery(
    {
      async fetchFn() {
        if (!edital?.id) {
          return;
        }
        return salaDisputaService.messages(edital?.id ?? "");
      },
      options: {
        onSuccess(data) {
          if (data?.dados) {
            setMessage((m) => {
              const messagesNew = [...m, ...data.dados];
              return messagesNew;
            });
          }
        },
      },
    },
    [edital?.id]
  );

  useEffect(() => {
    notificacaoOn<MensagemResponse>("message", (data) => {
      setMessage((m) => {
        const exist = m.find((d) => d.id == data.id);
        if (exist) {
          return m;
        }
        const messagesNew = [...m, data];

        return messagesNew;
      });
    });
  });

  return (
    <ChatCss>
      <Flex
        alignItems="center"
        gap="0.5rem"
        padding="1.375rem"
        fontSize="1rem"
        fontWeight="700"
        fontFamily="Red Hat Display"
      >
        <IconMessage boxSize="20px" />
        <Text>Mensagens</Text>
      </Flex>

      <Tabs variant="line" flex="1" height="calc(100% - 11.75rem)">
        <TabList>
          <Tab>Geral</Tab>
          <Tab>Conversas</Tab>
        </TabList>

        <TabPanels height="calc(100% - 42px)">
          <TabPanel overflow="auto" height="100%">
            <ContainerChat>
              {message.map((m) => (
                <BallonChat
                  key={m.id}
                  myMessage={
                    m.fornecedorId == fornecedorId ||
                    m.entidadePublicaId == tokenData?.providerId
                  }
                  message={m.message}
                  autor={getAutor(m)}
                  autorName={getAutorName(m)}
                  dateTime={m.createdAt}
                />
              ))}
            </ContainerChat>
          </TabPanel>
          <TabPanel overflow="auto" height="100%">
            <ContainerChat>
              {message
                .filter((m) => m.loteId == loteAtivo)
                .map((m) => (
                  <BallonChat
                    key={m.id}
                    myMessage={
                      m.fornecedorId == fornecedorId ||
                      m.entidadePublicaId == tokenData?.providerId
                    }
                    message={m.message}
                    autor={getAutor(m)}
                    autorName={getAutorName(m)}
                    dateTime={m.createdAt}
                  />
                ))}
            </ContainerChat>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <form method="post" onSubmit={sendMessageSubmit}>
        <Flex padding="1.375rem" alignItems="flex-end" gap="0.5rem">
          <Textarea
            placeholder="Digite sua mensagem..."
            fontSize="14px"
            resize="none"
            fontFamily="Inter"
            fontWeight="500"
            isInvalid={!!errors.message}
            {...register("message", { required: true })}
          />
          <Button variant="ghost" size="sm" type="submit">
            <IconSendMessage boxSize="20px" />
          </Button>
        </Flex>
      </form>
    </ChatCss>
  );
}
