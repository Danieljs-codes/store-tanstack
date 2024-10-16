import { Logo } from "@/components/logo";
import { protectRoute$ } from "@/server/actions/auth";
import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router";
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
	loader: async () => {
		const { user, session } = await protectRoute$();
		return { user, session };
	},
	component: Dashboard,
});

const asideRoutes = [
	{
		path: "/",
		label: "Overview",
		icon: IconDashboard,
	},
	{
		path: "/products",
		label: "Products",
		icon: IconPackage,
	},
	{
		path: "/orders",
		label: "Orders",
		icon: IconCart,
	},
	{
		path: "/discounts",
		label: "Discounts",
		icon: IconPriceTag,
	},
	{
		path: "/customers",
		label: "Customers",
		icon: IconContacts,
	},
] as const;

function Dashboard() {
	const location = useLocation();
	const { user } = Route.useLoaderData();

	const theme = "light" as string;
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
								// src={user.image}
								alt="User Avatar"
								// initials={user.name[0]}
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
									// @ts-expect-error - TODO: Create routes to fix types
									href={route.path}
									icon={route.icon}
									className="text-sm"
									isCurrent={location.pathname.includes(route.path)}
								>
									{route.label}
								</Aside.Item>
							))}
						</Aside.Section>
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
									// src={user.image}
									// initials={user.name[0]}
									alt="User Avatar"
								/>
								{/*{user.name}*/}
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
