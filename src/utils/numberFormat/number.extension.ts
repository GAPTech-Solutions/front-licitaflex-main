/* eslint-disable no-extend-native */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
interface Number {
  /**
   * Verifica se um número é decimal
   *
   * @returns boolean
   */
  eDecimal(): boolean;

  decimal(): number;

  inteiro(): number;
}

Number.prototype.eDecimal = function () {
  const modulo = this.valueOf() % 1;
  return modulo !== 0;
};

Number.prototype.decimal = function () {
  if (!this.eDecimal()) return 0;

  const decimal = Math.floor(this.valueOf()) - this.valueOf();
  return Math.abs(decimal);
};

Number.prototype.inteiro = function () {
  return this.valueOf() - this.decimal();
};
type OptionParseString = {
  safe: boolean;
};
interface NumberConstructor {
  /**
   * Faz o parse de string para numero, ela retira qualquer caracterer que não seja numero, "." ou "," e retorna um numero
   *
   *
   * @param {string} text
   * @param {OptionParseString} options
   */
  parseString(text: string, options?: OptionParseString): number;
}

const regexRemoveBaseMonetaria = /[^\d,.]/g;
const regexVirgulaSeparadorDecimal = /^[+-]?(\d+|\d{1,3}(\.\d{3})*)(,\d*)?$/;
const regexPontoSeparadorDecimal = /^[+-]?(\d+|\d{1,3}(,\d{3})*)(\.\d*)?$/;

function parseNumberVirgulaSeparadorDecimal(valor: string) {
  const valorSemSeparadorMilhar = valor.replaceAll(".", "").replace(",", ".");
  return Number(valorSemSeparadorMilhar);
}

const parseNumberPontoSeparadorDecimal = (valor: string) => {
  const valorSemSeparadorMilhar = valor.replaceAll(",", "");

  return Number(valorSemSeparadorMilhar);
};

const parseNumber = (valor: string) => {
  const valorSemSimboloMonetario = valor.replace(regexRemoveBaseMonetaria, "");

  if (valorSemSimboloMonetario.match(regexVirgulaSeparadorDecimal)) {
    return parseNumberVirgulaSeparadorDecimal(valorSemSimboloMonetario);
  }
  if (valorSemSimboloMonetario.match(regexPontoSeparadorDecimal)) {
    return parseNumberPontoSeparadorDecimal(valorSemSimboloMonetario);
  }
  return "-";
};

Number.parseString = function (text: string, options?: OptionParseString) {
  const { safe = false } = { ...options };
  const textString = text.toString();
  if (!textString) {
    if (safe) return 0;
    return Number.NaN;
  }
  const valorSemSimboloMonetario = textString.replace(
    regexRemoveBaseMonetaria,
    ""
  );

  if (valorSemSimboloMonetario.match(regexVirgulaSeparadorDecimal) != null) {
    return parseNumberVirgulaSeparadorDecimal(valorSemSimboloMonetario);
  }

  if (valorSemSimboloMonetario.match(regexPontoSeparadorDecimal) != null) {
    return parseNumberPontoSeparadorDecimal(valorSemSimboloMonetario);
  }
  if (safe) return 0;
  return Number.NaN;
};
