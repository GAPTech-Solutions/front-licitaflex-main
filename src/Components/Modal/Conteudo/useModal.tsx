import { ModalProps, Text } from "@chakra-ui/react";
import React, {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import FooterConfirm from "./FooterConfirm";

const CompDefault = () => <></>;
type ModalContentProps = Partial<ModalProps>;
export type OpenModalContent<T = unknown> = (
  title: ReactNode,
  body: React.FC<T>,
  props: T,
  onOpen?: () => void,
  onClose?: () => void
) => void;

type OpenProps<T = unknown> = {
  title: ReactNode;
  content: {
    component: React.FC<T>;
    props: T;
  };
  onOpen?: () => void;
  onClose?: () => void;
};

export type OpenConfirmProps = {
  title?: ReactNode;
  message: ReactNode;
  onConfirm?: () => void;
  onClose?: () => void;
};
export type PropsModalLicitaflex = {
  isOpen: boolean;
  title:
    | number
    | boolean
    | Iterable<React.ReactNode>
    | JSX.Element
    | null
    | undefined;
  children: JSX.Element;
  close: () => void;
  footer: React.ReactNode;
  isCentered: boolean;
  closeOnOverlayClick: boolean;
} & Partial<ModalProps>;
const propsDefault = {
  isCentered: true,
  closeOnOverlayClick: false,
  isOpen: false,
};
export default function useModal(props?: ModalContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onCloseFn = useRef<undefined | (() => any)>();
  const onPromisseResolve = useRef<undefined | ((value: boolean) => void)>();
  const titleModal = useRef<ReactNode>("");
  const BodyModal = useRef<React.FC | React.FC<object>>();
  const propsBody = useRef<object>();
  const FooterModal = useRef<ReactNode | undefined>(undefined);
  const propsModalCustom = useRef<ModalContentProps | undefined>(props);

  const text = (text: ReactNode) => {
    if (typeof text === "string") {
      return <Text as="h2">{text}</Text>;
    }
    return text;
  };

  function open<T = unknown>(openProps: OpenProps<T>) {
    const {
      content: { component, props },
      title,
      onClose,
      onOpen,
    } = openProps;
    titleModal.current = title;
    BodyModal.current = component as React.FC;
    propsBody.current = props as object;
    onCloseFn.current = onClose;
    setIsOpen(true);
    if (onOpen) {
      setTimeout(onOpen, 50);
    }
    return new Promise((resolve) => {
      onPromisseResolve.current = (value = true) => resolve(value);
    });
  }

  const confirmClick = (onConfirm?: () => void) => {
    return () => {
      onConfirm?.();
      close();
    };
  };

  function openConfirm(openProps: OpenConfirmProps) {
    const {
      message,
      onClose,
      onConfirm,
      title = "Confirmar exclusão!",
    } = openProps;

    FooterModal.current = (
      <FooterConfirm close={close} confirm={confirmClick(onConfirm)} />
    );
    propsModalCustom.current = {
      ...props,
      size: "md",
    };
    return open({
      title: title,
      content: {
        component: Fragment,
        props: { children: message },
      },
      onClose,
    });
  }
  const close = useCallback(() => {
    if (onCloseFn.current) setTimeout(onCloseFn.current, 50);
    if (onPromisseResolve.current) {
      onPromisseResolve.current(true);
    }
    setIsOpen(false);
    setTimeout(() => {
      FooterModal.current = undefined;
      propsModalCustom.current = props;
    }, 50);
  }, [isOpen]);

  const propsModal: PropsModalLicitaflex = useMemo(() => {
    const BodyChildren = BodyModal.current ?? CompDefault;
    return {
      ...propsDefault,
      ...propsModalCustom.current,
      isOpen,
      title: text(titleModal.current),
      children: <BodyChildren {...propsBody.current} />,
      close,
      footer: FooterModal.current,
    };
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    props: propsModal,
    openConfirm,
  };
}
