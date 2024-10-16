import { z } from "zod";

export const signUpSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const createStoreSchema = z.object({
	name: z.string().min(1, "Store name is required"),
	description: z
		.string()
		.min(1, "Store description is required")
		.min(10, "Store description must be at least 10 characters"),
});

export type CreateStoreFormData = z.infer<typeof createStoreSchema>;
