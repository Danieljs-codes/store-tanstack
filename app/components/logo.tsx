import LogoDark from "@/assets/logo-dark.svg?react";
import LogoLight from "@/assets/logo-light.svg?react";
// import { useTheme } from "#/components/theme-provider";
import { cn } from "@ui/primitive";
import type { ComponentPropsWithoutRef } from "react";

interface LogoProps
	extends Omit<ComponentPropsWithoutRef<typeof LogoLight>, "className"> {
	classNames?: Partial<Record<"container" | "icon" | "text", string>>;
}

export const Logo = ({ classNames, ...props }: LogoProps) => {
	// const { theme } = useTheme();
	const theme = "light" as string;
	const Component = theme === "light" ? LogoLight : LogoDark;
	return (
		<div className={cn("flex items-center gap-2", classNames?.container)}>
			<Component className={cn("h-10 w-auto", classNames?.icon)} {...props} />
			<span className={cn("text-xl font-bold", classNames?.text)}>
				Ecommerce
			</span>
		</div>
	);
};
