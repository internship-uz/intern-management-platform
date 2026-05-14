import * as React from "react";

import { NavMain } from "@/components/shared/nav-main";
import { NavUser } from "@/components/shared/nav-user";
import { TeamSwitcher } from "@/components/shared/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GraduationCapIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  teams: [
    {
      name: "Intern Manager",
      logo: <GraduationCapIcon />,
      plan: "Admin Panel",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Interns",
      url: "/interns",
      icon: <UsersIcon />,
      isActive: true,
      items: [
        { title: "All Interns", url: "/interns" },
        { title: "Add Intern", url: "/interns/new" },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: <ListChecksIcon />,
      items: [
        { title: "All Tasks", url: "/tasks" },
        { title: "Create Task", url: "/tasks/new" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <SettingsIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
