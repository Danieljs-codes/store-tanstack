import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store/$storeId/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<Outlet />
		</div>
	);
}
