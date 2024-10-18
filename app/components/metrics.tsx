import { sleep } from "@lib/utils/misc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Badge } from "@ui/badge";
import { Card } from "@ui/card";
import { IconCart, IconContacts, IconCurrencyDollar } from "justd-icons";

const OverviewCard = () => {
	const { data: totalSales } = useSuspenseQuery({
		queryKey: ["sleep"],
		queryFn: async () => {
			await sleep(1000);

			return {
				totalSales: 123456789,
			};
		},
	});

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title className="text-sm text-muted-fg sm:text-sm">
						Total Sales
					</Card.Title>
					<IconCurrencyDollar className="h-4 w-4 text-muted-fg" />
				</Card.Header>
				<Card.Content>
					<div className="text-2xl font-bold mb-2">$45,231.89</div>
					<p className="text-xs text-muted-fg">
						<Badge shape={"circle"} intent={"success"}>
							+20.1%
						</Badge>{" "}
						from last month
					</p>
				</Card.Content>
			</Card>
			<Card>
				<Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title className="text-sm text-muted-fg sm:text-sm">
						Orders
					</Card.Title>
					<IconCart className="h-4 w-4 text-muted-fg" />
				</Card.Header>
				<Card.Content>
					<div className="text-2xl font-bold mb-2">2350</div>
					<p className="text-xs text-muted-fg">
						<Badge shape={"circle"} intent={"success"}>
							+10.5%
						</Badge>{" "}
						from last month
					</p>
				</Card.Content>
			</Card>
			<Card>
				<Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title className="text-sm text-muted-fg sm:text-sm">
						Customers
					</Card.Title>
					<IconContacts className="h-4 w-4 text-muted-fg" />
				</Card.Header>
				<Card.Content>
					<div className="text-2xl font-bold mb-2">583</div>
					<p className="text-xs text-muted-fg">
						<Badge shape={"circle"} intent={"success"}>
							+11.8%
						</Badge>{" "}
						from last month
					</p>
				</Card.Content>
			</Card>
			<Card>
				<Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title className="text-sm text-muted-fg sm:text-sm">
						Revenue
					</Card.Title>
					<IconCurrencyDollar className="h-4 w-4 text-muted-fg" />
				</Card.Header>
				<Card.Content>
					<div className="text-2xl font-bold mb-2">$23,456.78</div>
					<p className="text-xs text-muted-fg">
						<Badge shape={"circle"} intent={"success"}>
							+15.3%
						</Badge>{" "}
						from last month
					</p>
				</Card.Content>
			</Card>
		</div>
	);
};

export { OverviewCard };
