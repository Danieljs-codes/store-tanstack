import { formatPrice } from "@lib/utils/misc";
import { Avatar } from "@ui/avatar";
import { Badge } from "@ui/badge";
import { Card } from "@ui/card";
import { Table } from "@ui/table";

const dummyOrders = [
	{
		id: "1",
		customer: {
			name: "John Doe",
			email: "john.doe@example.com",
			avatar: "https://i.pravatar.cc/300?img=1",
		},
		status: "Pending" as const,
		price: "$100",
		quantity: 1,
		total: 100,
	},
	{
		id: "2",
		customer: {
			name: "Jane Smith",
			email: "jane.smith@example.com",
			avatar: "https://i.pravatar.cc/300?img=2",
		},
		status: "Shipped" as const,
		price: "$50",
		quantity: 2,
		total: 100,
	},
	{
		id: "3",
		customer: {
			name: "Bob Johnson",
			email: "bob.johnson@example.com",
			avatar: "https://i.pravatar.cc/300?img=3",
		},
		status: "Delivered" as const,
		price: "$200",
		quantity: 3,
		total: 600,
	},
];

const RecentOrders = () => {
	return (
		<div>
			<Card.Header
				className="px-0 pt-0"
				title="Recent Orders"
				description="A list of the recent orders made by your customers"
				descriptionClassName="text-sm text-muted-fg"
			/>
			<div>
				<Card>
					<Table>
						<Table.Header>
							{/*<Table.Column className="w-0">Order ID</Table.Column>*/}
							<Table.Column className="w-0">#</Table.Column>
							<Table.Column isRowHeader>Customer</Table.Column>
							<Table.Column>Status</Table.Column>
							<Table.Column>Price</Table.Column>
							<Table.Column>Quantity</Table.Column>
							<Table.Column>Total</Table.Column>
						</Table.Header>
						<Table.Body items={dummyOrders}>
							{(item) => (
								<Table.Row>
									<Table.Cell>{item.id}</Table.Cell>
									<Table.Cell>
										<div className="flex items-center gap-x-2">
											<Avatar
												src={item.customer.avatar}
												alt={item.customer.name[0]}
												size={"medium"}
												shape={"circle"}
											/>
											<div>
												<div className="font-medium text-sm text-fg">
													{item.customer.name}
												</div>
												<div className="text-xs text-muted-fg">
													{item.customer.email}
												</div>
											</div>
										</div>
									</Table.Cell>
									<Table.Cell>
										<Badge
											intent={
												item.status === "Shipped"
													? "primary"
													: item.status === "Pending"
														? "info"
														: "success"
											}
										>
											{item.status}
										</Badge>
									</Table.Cell>
									<Table.Cell>{item.price}</Table.Cell>
									<Table.Cell>{item.quantity}</Table.Cell>
									<Table.Cell>{formatPrice(item.total)}</Table.Cell>
								</Table.Row>
							)}
						</Table.Body>
					</Table>
				</Card>
			</div>
		</div>
	);
};

export { RecentOrders };
