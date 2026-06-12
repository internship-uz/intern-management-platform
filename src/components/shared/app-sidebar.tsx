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
import { useTranslation } from "@/i18n";
import {
  ClipboardCheckIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  UsersIcon,
} from "lucide-react";

const data = {
  user: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://i.pravatar.cc/150?u=admin",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const navMain = [
    {
      title: t("nav.dashboard"),
      url: "/",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: t("nav.interns"),
      url: "/interns",
      icon: <UsersIcon />,
    },
    {
      title: t("nav.tasks"),
      url: "/tasks",
      icon: <ListChecksIcon />,
    },
    {
      title: t("nav.submissions"),
      url: "/submissions",
      icon: <ClipboardCheckIcon />,
    },
  ];
  
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
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
