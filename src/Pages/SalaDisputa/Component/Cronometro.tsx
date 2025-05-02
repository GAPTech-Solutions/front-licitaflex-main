import { useEffect, useState } from "react";

export type CronometroProps = {
  ativo: boolean;
  dataFinal?: Date | string;
  dataInicio?: Date | string;
};

function obterTimeExibicao(dataInicio: Date, dataFinal?: Date) {
  const dataAtual = new Date();

  if (dataFinal != undefined && dataAtual > dataFinal) {
    return 0;
  }
  if (dataFinal == undefined || dataFinal == null) {
    const tempoTotal = dataAtual.getTime() - dataInicio.getTime();
    return tempoTotal;
  }

  const tempo = dataFinal.getTime() - dataAtual.getTime();

  return tempo;
}

function formatarCronometro(time: number) {
  const segundos = (time / 1000) % 60;
  const minutos = (time / 1000 - segundos) / 60;

  const segundosString = Math.round(segundos).toString(10).padStart(2, "0");
  const minutosString = Math.round(minutos).toString(10).padStart(2, "0");

  return `00:${minutosString}:${segundosString}`;
}
export default function Cronometro(props: CronometroProps) {
  const { ativo, dataFinal, dataInicio } = props;

  const dataFinalFormatada = !dataFinal ? undefined : new Date(dataFinal);
  const [cronometro, setCronometro] = useState("00:00:00");

  const atualizarCronometro = () => {
    if (!ativo || !dataInicio) {
      return;
    }
    const time = obterTimeExibicao(new Date(dataInicio), dataFinalFormatada);
    setCronometro(formatarCronometro(time));
  };

  useEffect(() => {
    const timeInterval = setInterval(() => atualizarCronometro(), 250);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return <>{cronometro}</>;
}
