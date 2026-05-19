import * as React from "react";

import { NavMain } from "@/components/shared/nav-main";
import { NavUser } from "@/components/shared/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListChecksIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

const data = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://i.pravatar.cc/150?u=admin",
  },
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
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: <ListChecksIcon />,
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
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' className='hover:bg-transparent'>
              <img
                src='/logo.svg'
                alt='Intern Manager'
                className='h-8 w-auto object-contain'
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
