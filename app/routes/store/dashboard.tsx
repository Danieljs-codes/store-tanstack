import { Logo } from "@/components/logo";
import { protectRoute$ } from "@/server/actions/auth";
import {
	getStoreLast5Products$,
	validateUserOwnsStore$,
} from "@/server/actions/store";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	Outlet,
	createFileRoute,
	linkOptions,
	useLocation,
} from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";
import { Aside } from "@ui/aside";
import { Avatar } from "@ui/avatar";
import { Button } from "@ui/button";
import { Link } from "@ui/link";
import { Menu } from "@ui/menu";
import {
	IconCart,
	IconChevronLgDown,
	IconCirclePerson,
	IconContacts,
	IconDashboard,
	IconHome,
	IconMoon,
	IconPackage,
	IconPriceTag,
	IconSearch,
	IconSun,
} from "justd-icons";

export const Route = createFileRoute("/store/$storeId/dashboard")({
	loader: async ({ params, context }) => {
		const { user, session } = await protectRoute$();
		await validateUserOwnsStore$({ storeId: params.storeId });
		context.queryClient.ensureQueryData({
			queryKey: ["store", params.storeId],
			queryFn: () => getStoreLast5Products$({ storeId: params.storeId }),
		});
		return { user, session, storeId: params.storeId };
	},
	component: Dashboard,
});

const dashboardLink = linkOptions({
	to: "/store/$storeId/dashboard",
	from: "/store/$storeId/dashboard",
});

const productLink = linkOptions({
	to: "/store/$storeId/dashboard/products",
	from: "/store/$storeId/dashboard",
	activeProps: {},
});

const orderLink = linkOptions({
	to: "/store/$storeId/dashboard/orders",
	from: "/store/$storeId/dashboard",
});

const discountLink = linkOptions({
	to: "/store/$storeId/dashboard/discounts",
	from: "/store/$storeId/dashboard",
});

const customerLink = linkOptions({
	to: "/store/$storeId/dashboard/customers",
	from: "/store/$storeId/dashboard",
});

const asideRoutes = [
	{
		path: dashboardLink.to,
		label: "Overview",
		icon: IconDashboard,
	},
	{
		path: productLink.to,
		label: "Products",
		icon: IconPackage,
	},
	{
		path: orderLink.to,
		label: "Orders",
		icon: IconCart,
	},
	{
		path: discountLink.to,
		label: "Discounts",
		icon: IconPriceTag,
	},
	{
		path: customerLink.to,
		label: "Customers",
		icon: IconContacts,
	},
] as const;

function Dashboard() {
	const location = useLocation();
	const getLast5Products = useServerFn(getStoreLast5Products$);
	const { user, storeId } = Route.useLoaderData();

	const { data: products } = useSuspenseQuery({
		queryKey: ["store", storeId],
		queryFn: () => getLast5Products({ storeId }),
	});

	const theme = "light" as string;
	// @ts-ignore
	return (
		<Aside.Layout
			navbar={
				<Aside.Responsive>
					<Button
						aria-label="Toggle Theme"
						appearance="plain"
						shape="circle"
						size="square-petite"
						// onPress={toggleTheme}
					>
						{theme === "light" ? <IconSun /> : <IconMoon />}
					</Button>
					{/*TODO: Implement something here or change to something else*/}
					<Button
						aria-label="Search"
						appearance="plain"
						shape="circle"
						size="square-petite"
					>
						<IconSearch />
					</Button>
					<Menu>
						<Button
							appearance="plain"
							size="square-petite"
							shape="circle"
							aria-label="Profile"
							className="group"
						>
							<Avatar
								size="medium"
								src={user.image}
								alt="User Avatar"
								initials={user.name[0]}
							/>
						</Button>
						<Menu.Content placement="top" className="min-w-[--trigger-width]">
							<Menu.Item className="text-sm" href={"/"}>
								<IconHome />
								Home
							</Menu.Item>
						</Menu.Content>
					</Menu>
				</Aside.Responsive>
			}
			aside={
				<>
					<Aside.Header>
						<Link className="flex items-center gap-x-2" href={"/"}>
							<Logo classNames={{ icon: "w-6 h-auto", text: "text-lg" }} />
						</Link>
					</Aside.Header>
					<Aside.Content>
						<Aside.Section>
							{asideRoutes.map((route) => (
								<Aside.Item
									key={route.path}
									href={route.path}
									icon={route.icon}
									className="text-sm"
									isCurrent={
										route.path === "/store/$storeId/dashboard"
											? new RegExp(
													`${route.path.replace("$storeId", "[^/]+")}$`,
												).test(location.pathname)
											: new RegExp(
													route.path.replace("$storeId", "[^/]+"),
												).test(location.pathname)
									}
								>
									{route.label}
								</Aside.Item>
							))}
						</Aside.Section>
						{products.length > 0 && (
							<Aside.Section
								collapsible={true}
								defaultExpanded={true}
								title={"Latest Products"}
							>
								<Aside.Item
									className={"text-sm"}
									href={"/store/$storeId/dashboard/products"}
								>
									Product
								</Aside.Item>
							</Aside.Section>
						)}
					</Aside.Content>
					<Aside.Footer className="lg:flex lg:flex-row hidden items-center">
						<Menu>
							<Button
								appearance="plain"
								aria-label="Profile"
								className="group w-full justify-start flex"
							>
								<Avatar
									size={"small"}
									shape="square"
									className="-ml-1.5"
									src={user.image}
									initials={user.name[0]}
									alt="User Avatar"
								/>
								{user.name}
								<IconChevronLgDown className="right-3 absolute group-pressed:rotate-180 transition-transform" />
							</Button>
							<Menu.Content placement="top" className="min-w-[--trigger-width]">
								<Menu.Item href={"/"}>
									<IconCirclePerson />
									Profile
								</Menu.Item>
								<Menu.Item
								// onAction={toggleTheme}
								>
									{theme === "light" ? <IconSun /> : <IconMoon />}
									<span>
										Switch to {theme === "light" ? "Dark" : "Light"} Mode
									</span>
								</Menu.Item>

								{/* other items */}
							</Menu.Content>
						</Menu>
					</Aside.Footer>
				</>
			}
		>
			<main className="relative">
				<Outlet />
			</main>
		</Aside.Layout>
	);
}
