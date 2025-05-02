/* eslint-disable no-extend-native */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
interface Number {
  /**
   * Trata o numero como se fosse minutos e converte para horas, minutos.
   *
   * Ex.: 125 retorna 02:05
   *
   * @returns string
   */
  toStringTime(): string;
}

interface NumberConstructor {
  /**
   * Faz o parse de string time para numero em minutos
   *
   * Ex.: 02:05 retorna 125
   *
   * @param {string} time hora no formato 00:00
   */
  parseStringTime(time: string): number;
}

Number.prototype.toStringTime = function () {
  const minutes = this.valueOf() % 60;
  const hours = (this.valueOf() - minutes) / 60;

  const minutesString = minutes.toString(10).padStart(2, "0");
  const hoursString = hours.toString(10).padStart(2, "0");
  return `${hoursString}:${minutesString}`;
};

Number.parseStringTime = function (time: string) {
  const timeSplit = time.split(":");
  if (timeSplit.length !== 2) return Number.NaN;
  return Number(timeSplit[0]) * 60 + Number(timeSplit[1]);
};
