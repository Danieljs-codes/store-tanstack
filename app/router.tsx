import { QueryClient } from "@tanstack/react-query";
import {
	type NavigateOptions,
	type ToOptions,
	createRouter as createTanStackRouter,
} from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000,
			},
		},
	});
	const router = createTanStackRouter({
		routeTree,
		defaultPreload: "intent",
		context: {
			queryClient,
		},
	});

	return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

declare module "react-aria-components" {
	interface RouterConfig {
		href: ToOptions["to"];
		routerOptions: Omit<NavigateOptions, keyof ToOptions>;
	}
}
