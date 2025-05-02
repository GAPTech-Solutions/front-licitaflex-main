import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalProps,
  ModalContent as ModalContentChakra,
  Text,
  ModalFooter,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { ModalHeaderStyle } from "./style";

type ModalContentProps = {
  title: ReactNode;
  close: () => void;
  footer?: ReactNode;
} & Omit<ModalProps, "onClose" | "scrollBehavior">;
const propsDefault = {
  isCentered: true,
  closeOnOverlayClick: false,
  isOpen: false,
};

const text = (text: ReactNode) => {
  if (typeof text === "string") {
    return <Text as="h2">{text}</Text>;
  }
  return text;
};
export default function ModalContent(props: ModalContentProps) {
  const {
    isCentered,
    closeOnOverlayClick,
    isOpen,
    title,
    children,
    close,
    footer,
    ...propsModal
  } = {
    ...propsDefault,
    ...props,
  };
  return (
    <Modal
      {...propsModal}
      onClose={close}
      isOpen={isOpen}
      isCentered={isCentered}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <ModalOverlay />
      <ModalContentChakra padding="0 0 1rem 0">
        <ModalHeaderStyle>
          {text(title)}
          <ModalCloseButton top="auto" />
        </ModalHeaderStyle>
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContentChakra>
    </Modal>
  );
}
