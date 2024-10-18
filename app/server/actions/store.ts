import { db } from "@/db";
import schema from "@/db/schema";
import { useParser, useSerializer } from "@/server/actions/config";
import { getUser } from "@/server/actions/utils";
import { createStoreSchema } from "@lib/schema";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { desc, eq } from "drizzle-orm";
import { setCookie } from "vinxi/http";
import { z } from "zod";

const storeSchemaExtended = createStoreSchema.extend({
	logo: z.string().url().optional(),
});

export const createStore$ = useParser(
	createServerFn(
		"POST",
		useSerializer(async (data: z.infer<typeof storeSchemaExtended>, ctx) => {
			// Validate the data
			const result = storeSchemaExtended.safeParse(data);
			if (!result.success) {
				throw new Error("Invalid form data");
			}
			const user = await getUser(ctx.request.headers);

			if (!user) {
				throw new Error("You must be logged in to create a store");
			}

			//     Each user can only have one store
			const store = await db
				.select()
				.from(schema.store)
				.where(eq(schema.store.userId, user.user.id))
				.limit(1);

			if (store && store.length > 0) {
				throw new Error("You already have a store");
			}

			const { name, description, logo } = result.data;

			const newStore = await db
				.insert(schema.store)
				.values({
					name,
					description,
					logo,
					userId: user.user.id,
				})
				.returning({
					id: schema.store.id,
				});

			setCookie(
				"toast",
				JSON.stringify({
					intent: "success",
					message: "Redirecting you to your store dashboard",
				}),
			);

			throw redirect({
				to: "/store/$storeId/dashboard",
				params: {
					storeId: newStore[0].id,
				},
			});
		}),
	),
);

export const checkStoreExists$ = useParser(
	createServerFn(
		"GET",
		useSerializer(async (_, ctx) => {
			const user = await getUser(ctx.request.headers);

			if (!user) {
				setCookie(
					"toast",
					JSON.stringify({
						intent: "error",
						message: "You must be signed in to create a store",
					}),
				);
				throw redirect({
					to: "/sign-in",
				});
			}

			const store = await db
				.select({
					id: schema.store.id,
				})
				.from(schema.store)
				.where(eq(schema.store.userId, user.user.id))
				.limit(1);

			if (store && store.length > 0) {
				setCookie(
					"toast",
					JSON.stringify({
						intent: "success",
						message:
							"You already have a store, redirecting you to your store dashboard",
					}),
				);
				throw redirect({
					to: "/store/$storeId/dashboard",
					params: {
						storeId: store[0].id,
					},
				});
			}

			return;
		}),
	),
);

export const validateUserOwnsStore$ = useParser(
	createServerFn(
		"POST",
		useSerializer(async ({ storeId }: { storeId: string }, ctx) => {
			const user = await getUser(ctx.request.headers);

			if (!user) {
				setCookie(
					"toast",
					JSON.stringify({
						intent: "error",
						message: "You must be signed in to create a store",
					}),
				);
				throw redirect({
					to: "/sign-in",
				});
			}

			const store = await db
				.select()
				.from(schema.store)
				.where(eq(schema.store.id, storeId))
				.limit(1);

			//     If there is no store with the given id, return an error
			if (!store || store.length === 0) {
				setCookie(
					"toast",
					JSON.stringify({
						intent: "error",
						message: "You don't own this store",
					}),
				);
				throw redirect({
					to: "/",
				});
			}

			//     If store exists but user is not the owner, return an error
			if (store[0].userId !== user.user.id) {
				setCookie(
					"toast",
					JSON.stringify({
						intent: "error",
						message: "You don't own this store",
					}),
				);
				throw redirect({
					to: "/",
				});
			}

			return { user };
		}),
	),
);

export const getStoreLast5Products$ = useParser(
	createServerFn(
		"GET",
		useSerializer(async ({ storeId }: { storeId: string }, ctx) => {
			const user = await validateUserOwnsStore$({
				storeId,
			});

			// 	Get user last 5 products
			const products = await db
				.select({
					id: schema.product.id,
					name: schema.product.name,
					description: schema.product.description,
				})
				.from(schema.product)
				.where(eq(schema.product.storeId, storeId))
				.orderBy(desc(schema.product.createdAt))
				.limit(5);

			return products;
		}),
	),
);
