import { createFileRoute } from "@tanstack/react-router";
import { Heading } from "@ui/heading";

export const Route = createFileRoute("/store/$storeId/dashboard/products/")({
	component: ProductsIndex,
});

function ProductsIndex() {
	return (
		<div>
			<div>
				<Heading level={2} tracking={"tight"}>
					Products
				</Heading>
			</div>
		</div>
	);
}
