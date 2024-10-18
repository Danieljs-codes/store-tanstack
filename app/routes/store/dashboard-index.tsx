import { OverviewCard } from "@/components/metrics";
import { MetricsSkeleton } from "@/components/metrics-skeleton";
import { RecentOrders } from "@/components/recent-orders";
import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "@ui/heading";
import { Suspense } from "react";

export const Route = createFileRoute("/store/$storeId/dashboard/")({
	component: Dashboard,
});

function Dashboard() {
	return (
		<div>
			<div className={"mb-6"}>
				<Heading level={2} tracking={"tight"}>
					Overview
				</Heading>
				<p className={"text-sm text-muted-fg"}>
					This is the overview page for your store
				</p>
			</div>
			<div>
				<Suspense fallback={<MetricsSkeleton />}>
					<OverviewCard />
				</Suspense>
			</div>
			<div className={"mt-6"}>
				<Suspense fallback={<div>Loading...</div>}>
					<RecentOrders />
				</Suspense>
			</div>
		</div>
	);
}
