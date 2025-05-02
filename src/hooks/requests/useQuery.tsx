import {
  DependencyList,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import BaseError from "./errors/baseError";
import reportError from "./errors/reportError";

type UseQueryProps<T = unknown> = {
  fetchFn: () => Promise<T>;
  options?: {
    onSuccess?: (data?: T) => void;
    onError?: (error: BaseError) => void;
  };
};

interface UseQueryState<T = unknown> {
  data: T | undefined;
  error: BaseError | undefined;
  isFetching: boolean;
}
export default function useQuery<T = unknown>(
  props: UseQueryProps<T>,
  deps?: DependencyList
) {
  const { fetchFn, options } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const data = useRef<UseQueryState<T>>({
    data: undefined,
    error: undefined,
    isFetching: false,
  });

  const fetch = useCallback(async () => {
    setIsLoading(true);
    if (data.current.isFetching) return;
    data.current = { ...data.current, isFetching: true, error: undefined };
    const stateNew: UseQueryState<T> = {
      data: undefined as unknown as T,
      error: undefined,
      isFetching: false,
    };
    fetchFn()
      .then((resp) => {
        stateNew.data = resp;
        options?.onSuccess?.(resp);
      })
      .catch((error) => {
        const errorReturned = reportError(error);
        stateNew.error = errorReturned;
        options?.onError?.(error);
      })
      .finally(() => {
        data.current = { ...stateNew };
        setIsLoading(false);
      });
  }, [fetchFn]);

  useEffect(() => {
    fetch();
  }, deps ?? []);

  const reFetch = useCallback(() => {
    fetch();
  }, [fetch]);

  return { isLoading, ...data.current, reFetch };
}
