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
import { useAuth } from "@/features/auth";
import { useIntern } from "@/features/interns";
import { useTranslation } from "@/i18n";
import {
  LayoutDashboardIcon,
  ListChecksIcon,
  UserIcon,
} from "lucide-react";

export function InternSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { internId, user } = useAuth();
  const { intern } = useIntern(internId);

  const navMain = [
    {
      title: t("nav.dashboard"),
      url: "/intern",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: t("intern.myTasks"),
      url: "/intern/tasks",
      icon: <ListChecksIcon />,
    },
    {
      title: t("intern.profile"),
      url: "/intern/profile",
      icon: <UserIcon />,
    },
  ];

  const currentUser = {
    name: intern?.name ?? "Intern",
    email: intern?.email ?? user?.email ?? "",
    avatar: intern?.avatar ?? "https://github.com/shadcn.png",
  };

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent">
              <img
                src="/logo.svg"
                alt="Intern Portal"
                className="h-8 w-auto object-contain"
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
