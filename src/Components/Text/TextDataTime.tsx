type TextDataTimeProps = {
  children?: string;
};
export default function TextDataTime(props: TextDataTimeProps) {
  const { children } = props;

  if (!children) return <></>;
  const data = new Date(children);
  return (
    <>
      {data.toLocaleDateString()} às {data.toTimeStringPtBr()}
    </>
  );
}
