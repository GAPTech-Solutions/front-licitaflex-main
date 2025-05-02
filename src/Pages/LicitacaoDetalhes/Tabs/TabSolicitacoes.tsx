import TextMoney from "@/Components/Text/TextMoney";
import BallonAnexoChat from "@/Components/chat/BallonAnexoChat";
import BallonChat from "@/Components/chat/BallonChat";
import BallonGroupChat from "@/Components/chat/BallonGroupChat";
import ContainerChat from "@/Components/chat/ContainerChat";
import { IconEdit2 } from "@/Components/icons/iconEdit2";
import { CardLicita } from "@/Components/layout/CardLicita";
import { Edital } from "@/data/types/Edital";
import { Box, Button, Card, Link as LinkChakra } from "@chakra-ui/react";
import { useLicitacao } from "../contextLicitacao";

function nameTipoSolicitacao(tipo: number) {
  if (tipo == 1) {
    return "Esclarecimento";
  }
  return "Impulgnação";
}
export default function TabSolicitacoes() {
  const {
    edital: data,
    modalRespostaSolicitacaoClick,
    ePregoeiro,
  } = useLicitacao();
  return (
    <Card gap="1rem">
      {data?.solicitacoes.map((s) => (
        <CardLicita
          label={nameTipoSolicitacao(s.tipoSolicitacao)}
          direction="column"
          key={s.id}
        >
          <ContainerChat>
            <BallonGroupChat>
              <BallonChat
                minW="300px"
                maxW="600"
                myMessage
                message={s.descricao}
                dateTime={s.dataEnvio}
                autorName={s.solicitante.nome}
                showAutor={!s.documentoSolicitante}
              />
              {s.documentoSolicitante && (
                <BallonAnexoChat
                  minW="300px"
                  maxW="600"
                  myMessage
                  documento={s.documentoSolicitante}
                  dateTime={s.dataEnvio}
                  autorName={s.solicitante.nome}
                  showAutor
                />
              )}
            </BallonGroupChat>
            {!s.dataResposta && ePregoeiro && (
              <Button onClick={() => modalRespostaSolicitacaoClick(s)}>
                Responder
              </Button>
            )}
            {s.dataResposta && (
              <BallonGroupChat>
                <BallonChat
                  minW="300px"
                  maxW="600"
                  myMessage
                  message={s.resposta!}
                  dateTime={s.dataResposta!}
                  autorName={s.ouvidor?.nome}
                  showAutor={!s.documentoResposta}
                  autor="pregoeiro"
                />
                {s.documentoResposta && (
                  <BallonAnexoChat
                    minW="300px"
                    maxW="600"
                    myMessage
                    documento={s.documentoResposta}
                    dateTime={s.dataResposta!}
                    autorName={s.ouvidor?.nome}
                    showAutor
                    autor="pregoeiro"
                  />
                )}
              </BallonGroupChat>
            )}
          </ContainerChat>
        </CardLicita>
      ))}
    </Card>
  );
}
