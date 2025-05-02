import { useCallback, useRef, useState } from "react";
import BaseError from "./errors/baseError";
import reportError from "./errors/reportError";
type DataMutation<T, D> = D extends T
  ? D
  : D extends object | string | number | void
  ? D
  : T;
type UseMutationProps<T = unknown, D = unknown> = {
  mutateFn:
    | ((values: T) => Promise<DataMutation<T, D>>)
    | (() => Promise<DataMutation<T, D>>);
  options?: {
    onSuccess?: (data?: DataMutation<T, D>) => void;
    onError?: (error: BaseError) => void;
  };
};

export default function useMutation<T = unknown, D = unknown>(
  props: UseMutationProps<T, D>
) {
  const [isLoading, setIsLoading] = useState(false);
  const error = useRef<BaseError | undefined>();
  const data = useRef<DataMutation<T, D>>();
  const { mutateFn, options } = props;

  const mutate = useCallback(
    async (values: T) => {
      setIsLoading(true);
      mutateFn(values)
        .then((resp) => {
          if (!resp) {
            if (options?.onSuccess) options.onSuccess();
            return;
          }
          data.current = resp;
          if (options?.onSuccess) {
            options.onSuccess(resp);
          }
        })
        .catch((err) => {
          const errorReturned = reportError(err);
          if (options?.onError) {
            options.onError(errorReturned);
          }
          error.current = errorReturned;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [mutateFn, options]
  );

  return { isLoading, error, data, mutate };
}
