import BaseError from "@/hooks/requests/errors/baseError";
import useMutation from "@/hooks/requests/useMutation";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { IconTrash } from "../icons";
import { OpenConfirmProps } from "../Modal/Conteudo/useModal";

type ButtonDeleteProps = {
  mutate: () => Promise<any>;
  message: string;
  openConfirm: (props: OpenConfirmProps) => any;
  closeConfirm: () => void;
  onSuccess?: () => void;
  onError?: (error: BaseError) => void;
} & IconButtonProps;
export default function ButtonDelete(props: ButtonDeleteProps) {
  const {
    message,
    mutate: mutateUsuario,
    openConfirm,
    closeConfirm,
    onSuccess,
    onError,
    size = "sm",
    icon = <IconTrash width="1.25rem" height="1.25rem" />,
    variant = "ghost",
    ...restProps
  } = props;
  const messageText = message;
  const { mutate, isLoading } = useMutation<undefined, void>({
    mutateFn: mutateUsuario,
    options: {
      onSuccess: () => {
        closeConfirm();
        onSuccess?.();
      },
      onError,
    },
  });

  const clickDelete = () => {
    openConfirm({
      message: messageText,
      onConfirm: async () => await mutate(undefined),
    });
  };

  return (
    <IconButton
      size={size}
      variant={variant}
      icon={icon}
      {...restProps}
      onClick={clickDelete}
      isLoading={isLoading}
    />
  );
}
