import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@ui/link";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div>
			<p className={"text-sm"}>This is the home pagee</p>
			<Link href={"/create-store"} intent="danger">
				Create a store
			</Link>
		</div>
	);
}
