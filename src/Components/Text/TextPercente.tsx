type TextPercenteProps = {
  children?: string | number;
  locale?: string;
  precisao?: number;
};

export default function TextPercente(props: TextPercenteProps) {
  const { children, locale = "pt-BR", precisao = 2 } = props;
  if (!children) return <></>;
  const valor = Number.parseString(children.toString());
  if (Number.isNaN(valor)) return <>-</>;
  const format = new Intl.NumberFormat(locale, {
    maximumFractionDigits: precisao,
    minimumFractionDigits: precisao,
  });

  return <>{format.format(valor)} %</>;
}
