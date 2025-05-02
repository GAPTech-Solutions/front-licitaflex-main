import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
type ModalDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
};
export default function ModalDelete(props: ModalDeleteProps) {
  const {
    isOpen,
    onClose,
    onConfirm,
    message,
    title = "Confirmação de exclusão",
    isLoading,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Não
          </Button>
          <Button variant="ghost" onClick={onConfirm} isLoading={isLoading}>
            Sim
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
