import { useCallback, useRef, useState } from "react";

type OpenOpcoes = {
  title?: string;
  mensagem: string;
  onConfirm?: () => void;
  onClose?: () => void;
};
export default function useModalDelete() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const title = useRef<string>();
  const message = useRef<string>("");
  const onCloseModal = useRef<null | (() => any)>(null);
  const onConfirmModal = useRef<null | (() => any)>(null);
  const onPromisseResolve = useRef<null | ((value: boolean) => void)>(null);

  const onClose = useCallback(() => {
    onPromisseResolve.current?.(false);
    setIsOpen(false);
    title.current = "";
    message.current = "";
    onCloseModal.current?.();
    onCloseModal.current = null;
    onConfirmModal.current = null;
  }, [onCloseModal, onPromisseResolve]);

  const open = (options: OpenOpcoes) => {
    title.current = options.title;
    message.current = options.mensagem;
    setIsOpen(true);
    if (options.onClose) onCloseModal.current = options.onClose;
    if (options.onConfirm) onConfirmModal.current = options.onConfirm;
    return new Promise<boolean>((resolve) => {
      onPromisseResolve.current = resolve;
    });
  };

  const onConfirm = useCallback(async () => {
    onPromisseResolve.current?.(true);
    title.current = "";
    message.current = "";
    if (onConfirmModal.current) {
      setIsLoading(true);
      await onConfirmModal.current?.();
      setIsLoading(false);
    }
    onCloseModal.current = null;
    onConfirmModal.current = null;
    setIsOpen(false);
  }, [onConfirmModal, onPromisseResolve]);
  return {
    open,
    props: {
      isOpen,
      onClose,
      onConfirm,
      title: title.current,
      message: message.current,
      isLoading,
    },
  };
}
