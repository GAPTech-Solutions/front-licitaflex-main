type TextMoneyProps = {
  children?: string | number;
  locale?: string;
  precisao?: number;
};

export default function TextMoney(props: TextMoneyProps) {
  const { children, locale = "pt-BR", precisao = 2 } = props;
  if (!children) return <></>;
  const valor = Number.parseString(children.toString());
  if (Number.isNaN(valor)) return <>-</>;
  const format = new Intl.NumberFormat(locale, {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: precisao,
  });

  return <>{format.format(valor)}</>;
}
