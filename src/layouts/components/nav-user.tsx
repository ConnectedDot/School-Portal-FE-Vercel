"use client"

import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
    ChevronsUpDown,
    LogOut,
    UserRound,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { AuthContext } from "@/contexts/AuthContext"

export function NavUser({
    user,
}: {
    user: any
}) {
    const { isMobile, state } = useSidebar()
    const { logout } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login", { replace: true })
    }

    const isCollapsed = state === "collapsed"

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="h-14 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-3 text-slate-900 shadow-sm transition hover:bg-brand-50 data-[state=open]:bg-brand-50 data-[state=open]:text-brand-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] dark:data-[state=open]:bg-white/[0.08]"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg bg-brand-600 text-xs font-black text-white">
                                    {user.initials || "FS"}
                                </AvatarFallback>
                            </Avatar>
                            {!isCollapsed && (
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-black">{user.name}</span>
                                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                </div>
                            )}
                            {!isCollapsed && <ChevronsUpDown className="ml-auto size-4" />}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-2xl border-slate-200/80 bg-white/95 p-1 shadow-premium backdrop-blur-xl dark:border-white/10 dark:bg-[#111]/95"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={8}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-3 px-2 py-2 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg bg-brand-600 text-xs font-black text-white">
                                        {user.initials || "FS"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-black">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 rounded-xl">
                            <UserRound className="h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="gap-2 rounded-xl text-destructive focus:text-destructive"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
