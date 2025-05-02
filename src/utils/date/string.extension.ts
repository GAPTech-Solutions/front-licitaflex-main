/* eslint-disable no-extend-native */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
interface String {
  /**
   * Verfiica se uma string é data, e retorna ela formatada em IsoString
   *
   *
   * @returns string
   */
  parseDateIso(): string;
}

String.prototype.parseDateIso = function () {
  const date = new Date(this.valueOf());
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const time = date.toTimeStringPtBr();
  return `${year}-${month}-${day}T${time}`;
};
