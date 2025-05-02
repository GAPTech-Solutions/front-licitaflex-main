import { Button, Flex } from "@chakra-ui/react";

type FooterConfirmProps = {
  close: () => void;
  confirm: () => void;
};
export default function FooterConfirm(props: FooterConfirmProps) {
  const { close, confirm } = props;
  return (
    <>
      <Flex justifyContent="space-between" gap="1rem" flex="1">
        <Button type="button" onClick={close} flex="1" colorScheme="azul">
          Cancelar
        </Button>
        <Button type="button" flex="1" onClick={confirm} colorScheme="red">
          Confirmar
        </Button>
      </Flex>
    </>
  );
}
