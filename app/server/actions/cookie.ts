import { createServerFn } from "@tanstack/start";
import { deleteCookie, getCookie } from "vinxi/http";

export const getToastCookie = createServerFn("GET", async () => {
	const toast = getCookie("toast");

	if (toast) {
		deleteCookie("toast");
		return JSON.parse(toast) as { intent: string; message: string };
	}

	return null;
});
