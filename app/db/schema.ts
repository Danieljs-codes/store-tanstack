import { createId } from "@paralleldrive/cuid2";
import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text().notNull(),
	email: text().notNull().unique(),
	emailVerified: boolean().notNull(),
	image: text(),
	createdAt: timestamp().notNull(),
	updatedAt: timestamp().notNull(),
});

export const session = pgTable("session", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	expiresAt: timestamp("expiresAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	expiresAt: timestamp(),
	password: text(),
});

export const verification = pgTable("verification", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp().notNull(),
});

export const store = pgTable("store", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text().notNull(),
	description: text().notNull(),
	logo: text(),
	createdAt: timestamp({ mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp({ withTimezone: true })
		.notNull()
		.$onUpdate(() => new Date()),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const product = pgTable("product", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text().notNull(),
	description: text().notNull(),
	price: integer().notNull(),
	image: text().notNull(),
	createdAt: timestamp({ mode: "date", withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp({ withTimezone: true })
		.notNull()
		.$onUpdate(() => new Date()),
	storeId: text()
		.notNull()
		.references(() => store.id, { onDelete: "cascade" }),
});

export default {
	user,
	session,
	account,
	verification,
	store,
	product,
};
