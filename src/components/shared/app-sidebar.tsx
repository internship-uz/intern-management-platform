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
import { LayoutDashboardIcon, ListChecksIcon, UsersIcon } from "lucide-react";

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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
  
  const currentUser = {
    name: loggedUser.id ? "Admin" : data.user.name,
    email: loggedUser.email || data.user.email,
    avatar: loggedUser.id ? "https://github.com/shadcn.png" : data.user.avatar,
  };

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
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
