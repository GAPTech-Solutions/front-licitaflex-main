import { FornecedorEnquadramentoEnum } from "@/data/enum/FornecedorEnquadramentoEnum";
import { Flex, Tag } from "@chakra-ui/react";

type LinhaFornecedorProps = {
  enquadramento: FornecedorEnquadramentoEnum;
  apelido: string;
};
export default function LinhaFornecedor(props: LinhaFornecedorProps) {
  return (
    <Flex alignItems="center" gap="0.5rem">
      {props.apelido}
      {props.enquadramento < 3 && (
        <Tag>{FornecedorEnquadramentoEnum.toString(props.enquadramento)}</Tag>
      )}
    </Flex>
  );
}
