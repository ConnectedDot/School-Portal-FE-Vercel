"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: any;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path matches the nav item
  const isActivePath = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  return (
    <SidebarGroup className="p-1">
      <SidebarGroupLabel className="mb-1 px-3 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1.5">
        {items.map((item) => {
          const isActive = isActivePath(item.url);

          // If item has sub-items, render as collapsible
          if (item.items && item.items.length > 0) {
            const hasActiveSubItem = item.items.some((subItem) =>
              isActivePath(subItem.url),
            );

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive || hasActiveSubItem}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive || hasActiveSubItem}
                      className="h-10 rounded-xl px-3 font-semibold data-[active=true]:bg-brand-50 data-[active=true]:text-brand-700 dark:data-[active=true]:bg-brand-500/10 dark:data-[active=true]:text-brand-300 dark:data-[active=true]:shadow-none"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubItemActive = isActivePath(subItem.url);
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isSubItemActive}
                              className="h-8 rounded-lg text-[13px] font-semibold data-[active=true]:bg-brand-50 data-[active=true]:text-brand-700 dark:data-[active=true]:bg-brand-500/10 dark:data-[active=true]:text-brand-300 dark:data-[active=true]:shadow-none"
                            >
                              <button
                                className="cursor-pointer w-full text-left"
                                onClick={() => navigate(subItem.url)}
                              >
                                <span>{subItem.title}</span>
                              </button>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // Otherwise, render as direct link
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
                className="h-10 rounded-xl px-3 font-semibold data-[active=true]:bg-brand-50 data-[active=true]:text-brand-700 dark:data-[active=true]:bg-brand-500/10 dark:data-[active=true]:text-brand-300 dark:data-[active=true]:shadow-none"
              >
                <button
                  className="cursor-pointer w-full text-left"
                  onClick={() => navigate(item.url)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
