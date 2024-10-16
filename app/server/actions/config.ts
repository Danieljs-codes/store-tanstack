import type { FetchFn, Fetcher, FetcherOptions } from "@tanstack/start";
import superjson from "superjson";

type SerializerResponse<T> = {
	$type: T;
	data: string;
};

export const useSerializer = <TPayload = undefined, TResponse = unknown>(
	fn: FetchFn<TPayload, TResponse>,
): FetchFn<TPayload, SerializerResponse<TResponse>> => {
	return async (...args) => ({
		$type: null as TResponse,
		data: superjson.stringify(await fn(...args)),
	});
};

export const useParser = <TPayload = undefined, TResponse = unknown>(
	serverFn: Fetcher<TPayload, SerializerResponse<TResponse>>,
): ((
	...args: Parameters<Fetcher<TPayload, TResponse>>
) => Promise<TResponse>) => {
	return (async (payload: TPayload, opts: FetcherOptions | undefined) =>
		superjson.parse((await serverFn(payload, opts)).data) as TResponse) as any;
};
