import { useToast as useToastChakra, UseToastOptions } from "@chakra-ui/react";

type ToastProp = UseToastOptions;
export default function useToast(props?: ToastProp) {
  const toast = useToastChakra({
    position: "top-right",
    duration: 2000,
    isClosable: true,
    ...props,
  });

  return toast;
}
