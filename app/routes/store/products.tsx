import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store/$storeId/dashboard/products")({
	component: ProductsLayout,
});

function ProductsLayout() {
	return <Outlet />;
}
