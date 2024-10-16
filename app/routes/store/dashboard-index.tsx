import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store/$storeId/dashboard/")({
	component: DashboardIndex,
});

function DashboardIndex() {
	return (
		<div>
			<h1>Dashboard Index</h1>
		</div>
	);
}
