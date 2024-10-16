import { auth } from "@lib/auth";

export const getUser = async (headers: Headers) => {
	return await auth.api.getSession({
		headers: headers,
	});
};
