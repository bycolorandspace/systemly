"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  PlusCircle,
  PlusIcon,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/common/nav-main";
import { NavUser } from "@/components/common/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { useAuth } from "@/contexts/auth-context";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { loading, user } = useAuth();

  const data = {
    user: {
      name: user ? user?.email : "System Comrad",
      email: "m@example.com",
      avatar: "",
    },
    main: [
      {
        name: "New Analysis",
        url: "/analysis/new",
        icon: PlusIcon,
      },
      {
        name: "All Analyses",
        url: "/analysis",
        icon: SquareTerminal,
      },
      {
        name: "Community ideas",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-10">
        <NavMain links={data.main} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
