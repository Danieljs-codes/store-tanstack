import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { Link } from "@ui/link";
import { Loader } from "@ui/loader";
import { TextField } from "@ui/text-field";

export const Route = createFileRoute("/_auth-layout-id/sign-up")({
	component: SignUp,
});

function SignUp() {
	const isPending = false;
	return (
		<div>
			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold">Create your account</h1>
				<p className="text-sm text-muted-fg mt-2">
					Create an account to start shopping, track orders, and enjoy
					personalized recommendations
				</p>
			</div>
			<Form>
				<div className="space-y-5">
					<TextField
						label="Name"
						placeholder="Enter your name"
						isRequired={true}
					/>
					<TextField
						label="Email"
						placeholder="Enter your email"
						isRequired={true}
						type="email"
					/>
					<TextField
						label="Password"
						placeholder="Enter your password"
						isRequired={true}
						type="password"
						isRevealable={true}
						pattern="^.{6,}$"
						description="Password must be at least 6 characters"
						descriptionClassName="text-sm text-muted-fg"
					/>
				</div>
				<Button
					type="submit"
					size="small"
					className="w-full mt-6"
					isPending={isPending}
				>
					{({ isPending }) =>
						isPending ? <Loader variant="spin" /> : "Sign up"
					}
				</Button>
			</Form>
			<p className="text-sm text-muted-fg mt-6 text-center">
				Already have an account?{" "}
				<Link href="/sign-in" intent={"primary"} className={"font-medium"}>
					Sign in
				</Link>
			</p>
		</div>
	);
}
