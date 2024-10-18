import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store/$storeId/dashboard/orders")({
	component: () => <div>Hello /store/$storeId/dashboard/orders!</div>,
});
