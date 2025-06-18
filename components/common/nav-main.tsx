"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  links,
}: {
  links: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {links.map((item, index) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              size={"default"}
              className={`${index === 0 && "bg-card"}`}
              asChild
            >
              <Link href={item.url}>
                <item.icon
                  className={`w-8 h-8  ${
                    index === 0
                      ? "bg-white text-black rounded-full"
                      : "text-secondary"
                  }`}
                  size={10}
                />
                <span className="text-md font-medium">{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
