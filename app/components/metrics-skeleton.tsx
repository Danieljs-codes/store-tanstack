import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MetricsSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{[...Array(4)].map((_, index) => (
				// biome-ignore lint: I know what I'm doing here
				<Card key={index}>
					<Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
						<Skeleton className="h-4 w-24" /> {/* Title skeleton */}
						<Skeleton className="h-4 w-4 rounded-full" /> {/* Icon skeleton */}
					</Card.Header>
					<Card.Content>
						<Skeleton className="h-8 w-32 mb-2" /> {/* Value skeleton */}
						<div className="flex items-center gap-2">
							<Skeleton className="h-5 w-14 rounded-full" />{" "}
							{/* Badge skeleton */}
							<Skeleton className="h-4 w-24" />{" "}
							{/* "from last month" text skeleton */}
						</div>
					</Card.Content>
				</Card>
			))}
		</div>
	);
};

export { MetricsSkeleton };
