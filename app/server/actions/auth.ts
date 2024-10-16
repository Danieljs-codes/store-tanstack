import { useParser, useSerializer } from "@/server/actions/config";
import { getUser } from "@/server/actions/utils";
import { auth } from "@lib/auth";
import { signInSchema, signUpSchema } from "@lib/schema";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { APIError } from "better-auth/api";
import { setCookie, setResponseHeader } from "vinxi/http";

export const protectRoute$ = useParser(
	createServerFn(
		"GET",
		useSerializer(async (data, ctx) => {
			const user = await getUser(ctx.request.headers);
			if (!user) {
				setCookie(
					"toast",
					JSON.stringify({
						intent: "error",
						message: "You must be logged in to access this page",
					}),
				);

				throw redirect({
					to: "/sign-in",
				});
			}

			return user;
		}),
	),
);

export const signUp$ = createServerFn(
	"POST",
	async (
		data: {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
		},
		ctx,
	) => {
		const result = signUpSchema.safeParse(data);

		if (!result.success) {
			// setResponseStatus(400);
			return {
				error: "Invalid form data",
				success: false as const,
			};
		}

		const { firstName, lastName, email, password } = result.data;
		const name = `${firstName} ${lastName}`;

		let response: Response;

		try {
			response = await auth.api.signUpEmail({
				body: {
					name,
					email,
					password,
				},
				asResponse: true,
				headers: ctx.request.headers,
			});
		} catch (error) {
			console.log(error);
			if (error instanceof APIError) {
				// setResponseStatus(400);
				return {
					error: error.body.message as string,
					success: false as const,
				};
			}

			// setResponseStatus(500);
			return {
				error: "Something went wrong",
				success: false as const,
			};
		}

		// setResponseStatus(response.status);
		response.headers.forEach((value, key) => {
			setResponseHeader(key, value);
		});

		setCookie(
			"toast",
			JSON.stringify({
				intent: "success",
				message: "You have successfully signed up",
			}),
		);

		throw redirect({
			to: "/",
		});
	},
);

export const signIn$ = createServerFn(
	"POST",
	async (
		data: {
			email: string;
			password: string;
		},
		ctx,
	) => {
		const result = signInSchema.safeParse(data);
		if (!result.success) {
			// setResponseStatus(400);
			return {
				error: "Invalid form data",
				success: false as const,
			};
		}

		const { email, password } = result.data;

		let response: Response;

		try {
			response = await auth.api.signInEmail({
				body: {
					email,
					password,
				},
				asResponse: true,
				headers: ctx.request.headers,
			});
		} catch (error) {
			if (error instanceof APIError) {
				// setResponseStatus(400);
				return {
					error: error.body.message as string,
					success: false as const,
				};
			}

			// setResponseStatus(500);
			return {
				error: "Something went wrong",
				success: false as const,
			};
		}

		// setResponseStatus(response.status);
		response.headers.forEach((value, key) => {
			setResponseHeader(key, value);
		});

		setCookie(
			"toast",
			JSON.stringify({
				intent: "success",
				message: "You have successfully signed in",
			}),
		);

		throw redirect({
			to: "/",
		});
	},
);
