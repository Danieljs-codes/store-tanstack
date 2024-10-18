import { db } from "@/db";
import schema from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import type { FileRouter } from "uploadthing/server";
import { UploadThingError, createUploadthing } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const uploadRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	storeLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload

			const user = await auth.api.getSession({
				headers: req.headers,
			});

			// If you throw, the user will not be able to upload
			if (!user) throw new UploadThingError("Unauthorized");

			// Validate user don't have a store already
			const store = await db
				.select()
				.from(schema.store)
				.where(eq(schema.store.userId, user.user.id))
				.limit(1);

			if (store.length > 0) {
				throw new UploadThingError("You already have a store");
			}

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId, fileUrl: file.url };
		}),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
