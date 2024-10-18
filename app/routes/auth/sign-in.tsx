import { signIn$ } from "@/server/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInFormData, signInSchema } from "@lib/schema";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";
import { Button } from "@ui/button";
import { Link } from "@ui/link";
import { Loader } from "@ui/loader";
import { Note } from "@ui/note";
import { TextField } from "@ui/text-field";
import { Controller, useForm } from "react-hook-form";
import { useSpinDelay } from "spin-delay";

export const Route = createFileRoute("/_auth-layout-id/sign-in")({
	component: SignIn,
});

function SignIn() {
	const signIn = useServerFn(signIn$);
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ["sign-in"],
		mutationFn: async (data: SignInFormData) => {
			const res = await signIn(data);

			if (!res.success) {
				throw new Error(res.error);
			}

			return;
		},
		onError: (error) => {
			setError("root", { message: error.message });
		},
	});

	const showSpinner = useSpinDelay(isPending, {
		delay: 300,
		minDuration: 500,
	});

	const onSubmit = async (data: SignInFormData) => {
		mutate(data);
	};

	return (
		<div>
			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold">Sign in to your account</h1>
				<p className="text-sm text-muted-fg mt-2">
					Sign in to start shopping, track your orders, and enjoy personalized
					recommendations.
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{errors.root && !showSpinner && (
					<Note intent="danger">{errors.root.message}</Note>
				)}
				<div className="space-y-5">
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								label="Email"
								placeholder="Enter your email"
								isInvalid={!!errors.email}
								errorMessage={errors.email?.message}
								isDisabled={showSpinner}
								isLoading={showSpinner}
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
								isDisabled={showSpinner}
								isRevealable={true}
								isLoading={showSpinner}
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
					isPending={showSpinner}
				>
					{({ isPending }) =>
						isPending ? <Loader variant="spin" /> : "Create account"
					}
				</Button>
			</form>
			<p className="text-sm text-muted-fg mt-6 te text-center">
				Don't have an account?{" "}
				<Link href="/sign-up" intent="primary" className="font-medium">
					Sign up
				</Link>
			</p>
		</div>
	);
}
