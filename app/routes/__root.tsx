import { getToastCookie } from "@/server/actions/cookie";
import { ClientHintCheck } from "@lib/utils/client-hints";
import type { QueryClient } from "@tanstack/react-query";
import {
	Outlet,
	ScrollRestoration,
	createRootRouteWithContext,
	useRouter,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { Toast } from "@ui/toast";
import type * as React from "react";
import { useEffect } from "react";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";
import { toast as showToast } from "sonner";
import appCss from "../global.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	meta: () => [
		{
			charSet: "utf-8",
		},
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1",
		},
		{
			title: "TanStack Start Starter",
		},
	],
	links: () => [
		{
			rel: "stylesheet",
			href: appCss,
		},
	],
	loader: async () => {
		const toast = await getToastCookie();

		return { toast };
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
			<Toast />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { toast } = Route.useLoaderData();

	useEffect(() => {
		if (!toast) return;
		showToast[toast.intent](toast.message);
	}, [toast]);

	return (
		<Html>
			<Head>
				<ClientHintCheck />
				<Meta />
			</Head>
			<Body>
				<ReactAriaRouterProvider
					navigate={(to, options) => router.navigate({ to, ...options })}
					useHref={(to) => router.buildLocation({ to }).href}
				>
					{children}
				</ReactAriaRouterProvider>
				<ScrollRestoration />
				<Scripts />
			</Body>
		</Html>
	);
}
