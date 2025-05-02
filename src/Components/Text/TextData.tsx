type TextDataProps = {
  children?: string;
};
export default function TextData(props: TextDataProps) {
  const { children } = props;

  if (!children) return <></>;
  const data = new Date(children);
  return <>{data.toLocaleDateString()}</>;
}
