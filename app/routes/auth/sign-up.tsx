import { signUp$ } from "@/server/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignUpFormData, signUpSchema } from "@lib/schema";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";
import { Button } from "@ui/button";
import { Link } from "@ui/link";
import { Loader } from "@ui/loader";
import { Note } from "@ui/note";
import { TextField } from "@ui/text-field";
import { Controller, useForm } from "react-hook-form";

export const Route = createFileRoute("/_auth-layout-id/sign-up")({
	component: SignUp,
});

function SignUp() {
	const signUp = useServerFn(signUp$);
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ["sign-up"],
		mutationFn: async (data: SignUpFormData) => {
			const res = await signUp(data);

			if (res.success === false) {
				throw new Error(res.error);
			}

			return;
		},
		onError: (error) => {
			setError("root", { message: error.message });
		},
	});

	const onSubmit = async (data: SignUpFormData) => {
		mutate(data);
	};

	return (
		<div>
			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold">Create your account</h1>
				<p className="text-sm text-muted-fg mt-2">
					Create an account to start shopping, track orders, and enjoy
					personalized recommendations
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{errors.root && <Note intent="danger">{errors.root.message}</Note>}
				<div className="space-y-5">
					<Controller
						name="firstName"
						control={control}
						render={({ field }) => (
							<TextField
								label="First Name"
								placeholder="Enter your first name"
								isInvalid={!!errors.firstName}
								errorMessage={errors.firstName?.message}
								isDisabled={isPending}
								isLoading={isPending}
								indicatorPlace="suffix"
								{...field}
							/>
						)}
					/>
					<Controller
						name="lastName"
						control={control}
						render={({ field }) => (
							<TextField
								label="Last Name"
								placeholder="Enter your last name"
								isInvalid={!!errors.lastName}
								errorMessage={errors.lastName?.message}
								isDisabled={isPending}
								isLoading={isPending}
								indicatorPlace="suffix"
								{...field}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								label="Email"
								placeholder="Enter your email"
								isInvalid={!!errors.email}
								errorMessage={errors.email?.message}
								isDisabled={isPending}
								isLoading={isPending}
								indicatorPlace="suffix"
								{...field}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField
								label="Password"
								type="password"
								placeholder="Enter your password"
								isInvalid={!!errors.password}
								errorMessage={errors.password?.message}
								isDisabled={isPending}
								isRevealable={true}
								isLoading={isPending}
								indicatorPlace="suffix"
								{...field}
							/>
						)}
					/>
				</div>
				<Button
					type="submit"
					size="small"
					className="w-full mt-6"
					isPending={isPending}
				>
					{({ isPending }) =>
						isPending ? <Loader variant="spin" /> : "Create account"
					}
				</Button>
			</form>
			<p className="text-sm text-muted-fg mt-6 text-center">
				Already have an account?{" "}
				<Link href="/sign-in" intent="primary" className="font-medium">
					Sign in
				</Link>
			</p>
		</div>
	);
}
