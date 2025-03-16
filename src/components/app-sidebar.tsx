"use client";

import type * as React from "react";

import { NavSocials } from "@/components/navbar/nav-projects";
import { NavUser } from "@/components/navbar/nav-user";
import { OrgButton } from "@/components/org-button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "@/constants/navigation";
import type { Session } from "next-auth";

export function AppSidebar({
	session,
	...props
}: React.ComponentProps<typeof Sidebar> & { session: Session }) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<OrgButton />
			</SidebarHeader>
			<SidebarContent>
				<NavSocials items={data.socialMedia} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser session={session} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
