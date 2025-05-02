export const isValidCnpj = (cnpj: string) => {
  const cnpjClean = cnpj.replace(/[^\d]+/g, "");
  if (cnpjClean.length !== 14) {
    return false;
  }
  const t = cnpjClean.split("");

  let j = 5;
  let k = 6;
  let sumD1 = 0;
  let sumD2 = 0;
  for (let i = 0; i < 13; i++) {
    j = j === 1 ? 9 : j;
    k = k === 1 ? 9 : k;
    sumD2 += parseInt(t[i]) * k;
    if (i < 12) sumD1 += parseInt(t[i]) * j;

    k--;
    j--;
  }
  const d1 = sumD1 % 11 < 2 ? 0 : 11 - (sumD1 % 11);
  const d2 = sumD2 % 11 < 2 ? 0 : 11 - (sumD2 % 11);

  return d1 === parseInt(t[12]) && d2 === parseInt(t[13]);
};

export default function validateCNPJ(
  value?: string
): boolean | string | undefined {
  if (!value) return undefined;
  if (isValidCnpj(value)) return true;

  return "O CNPJ informado é inválido";
}
