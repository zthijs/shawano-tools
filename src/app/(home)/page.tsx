import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import Link from "next/link";

export default function Page() {
	return (
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Home</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					{NAVIGATION_ITEMS.socialMedia.map((item) => (
						<Card key={item.name} className="justify-between">
							<CardHeader>
								<CardTitle>{item.name}</CardTitle>
								<CardDescription>{item.description}</CardDescription>
								<CardAction>
									<item.icon />
								</CardAction>
							</CardHeader>
							<CardFooter>
								<Button className="w-full" variant={"secondary"} asChild>
									<Link href={item.url}>Open</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</SidebarInset>
	);
}
