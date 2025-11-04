import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { ClientRequestOptions } from "hono";
import {
  type ClientResponse,
  type DetailedError,
  hc,
  parseResponse,
} from "hono/client";
import type { StatusCode } from "hono/utils/http-status";
import { config } from "~/config/client";
import type { ApiType } from "../../server/app";

export const apiClient = hc<ApiType>(config.VITE_API_URL, {
  init: {
    credentials: "include",
  },
});

type Rpc<Data, Args> = (
  args: Args,
  options?: ClientRequestOptions
) => Promise<ClientResponse<Data, StatusCode, "json">>;

type UseRpcQueryOptions<Data, Args> = Omit<
  UseQueryOptions<Data, Error>,
  "queryKey" | "queryFn"
> & {
  call: Rpc<Data, Args>;
  args: Args;
  requestOptions?: ClientRequestOptions;
};

type UseRpcMutationOptions<Data, Args, MutationArgs extends void> = Omit<
  UseMutationOptions<Data, Error>,
  "mutationFn"
> & {
  call: Rpc<Data, Args>;
  args: (args: MutationArgs) => Args;
  requestOptions?: ClientRequestOptions;
};

export function useRpcQuery<Data, Args>(
  options: UseRpcQueryOptions<Data, Args>
) {
  return useQuery<Data, DetailedError>({
    queryKey: ["rpc", options.call, options.args],
    queryFn: () =>
      parseResponse(options.call(options.args, options.requestOptions)),
  });
}

export function useRpcMutation<Data, Args, MutationArgs extends void>(
  options: UseRpcMutationOptions<Data, Args, MutationArgs>
) {
  return useMutation<Data, DetailedError, MutationArgs>({
    ...options,
    mutationFn: (mutationArgs) =>
      parseResponse(
        options.call(options.args(mutationArgs), options.requestOptions)
      ),
  });
}
