/** Dado os 9 primeiros numero do cpf, ele retorna os digitos finais */
function digit(number: string): string {
  const length = number.length + 1;
  let x = 0;
  for (let i = length, j = 0; i >= 2; i--, j++) {
    x += parseInt(number[j]) * i;
  }
  const modeDigit = x % 11;
  const digitCpf = modeDigit < 2 ? 0 : 11 - modeDigit;

  const cpf = `${number}${digitCpf}`;
  if (cpf.length === 11) {
    return cpf;
  }
  return digit(cpf);
}

export const isValidCpf = (value: string) => {
  /** Retira as mascaras */
  const cpfClear = value.replace(/[^\d]+/g, "");
  if (cpfClear.length !== 11) return false;
  /** Verifica se os cpfs não são do tipo 111.111.111-11 */
  for (let i = 0; i <= 9; i++) {
    const cpfInvalid = Array(11).fill(i).join("");
    if (cpfClear === cpfInvalid) return false;
  }
  /** Paga os 9 primeiros digitos do cpf */
  const firstNineDigits = cpfClear.substring(0, 9);
  /** Gera o cpf com os digitos válidos */
  const cpfValid = digit(firstNineDigits);
  /** Verifica se o cpf gerado é igual ao cpf informado */
  return cpfValid === cpfClear;
};

export default function validateCPF(
  value?: string
): boolean | string | undefined {
  if (!value) return undefined;
  if (isValidCpf(value)) return true;

  return "O CPF informado é inválido";
}
