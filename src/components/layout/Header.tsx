import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	Bell,
	Command,
	LogOut,
	Menu,
	Monitor,
	Moon,
	Search,
	Settings,
	ShieldCheck,
	Sun,
	User,
} from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { NotificationBell } from "./NotificationBell";

export const Header = () => {
	const { user, logout } = useContext(AuthContext);
	const { theme, setTheme } = useTheme();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	const getInitials = () => {
		const firstName = user?.firstName ?? "";
		const lastName = user?.lastName ?? "";
		const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.trim();
		return initials || "FS";
	};

	const ThemeIcon = () => {
		switch (theme) {
			case "light":
				return <Sun className="h-4 w-4" />;
			case "dark":
				return <Moon className="h-4 w-4" />;
			default:
				return <Monitor className="h-4 w-4" />;
		}
	};

	return (
		<TooltipProvider>
			<header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#050505]/75 sm:px-6 lg:px-8">
				<div className="mx-auto flex w-full max-w-[1600px] items-center gap-4">
					<SidebarTrigger className="h-10 w-10 rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
						<Menu className="h-5 w-5" />
					</SidebarTrigger>

					<div className="hidden min-w-0 flex-1 md:block">
						<div className="relative max-w-xl">
							<Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<Input
								type="search"
								placeholder="Search students, guardians, teachers, invoices..."
								className="h-11 rounded-full border-slate-200 bg-slate-50/80 pl-11 pr-24 shadow-none focus-visible:ring-brand-500 dark:border-white/10 dark:bg-white/[0.04]"
							/>
							<div className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-400 dark:border-white/10 dark:bg-white/5 lg:flex">
								<Command className="h-3 w-3" /> K
							</div>
						</div>
					</div>

					<div className="ml-auto flex items-center gap-2">
						<Badge className="hidden rounded-full border-brand-200 bg-brand-50 px-3 py-1 text-brand-700 hover:bg-brand-50 dark:border-white/10 dark:bg-white/5 dark:text-brand-300 sm:inline-flex">
							<ShieldCheck className="mr-1 h-3.5 w-3.5" /> Secure Portal
						</Badge>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-slate-200 bg-white/80 hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
									<ThemeIcon />
									<span className="sr-only">Toggle theme</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-44 rounded-2xl">
								<DropdownMenuItem onClick={() => setTheme("light")}>
									<Sun className="mr-2 h-4 w-4" /> Light
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")}>
									<Moon className="mr-2 h-4 w-4" /> Dark
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")}>
									<Monitor className="mr-2 h-4 w-4" /> System
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<NotificationBell />

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full border border-slate-200 bg-white/80 hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
									<Bell className="h-4 w-4" />
									<span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-[#050505]" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>System alerts</TooltipContent>
						</Tooltip>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-11 gap-2 rounded-full border border-slate-200 bg-white/80 px-2 pr-3 hover:bg-brand-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
									<Avatar className="h-8 w-8 border border-brand-200">
										<AvatarImage src={user?.avatar} alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`} />
										<AvatarFallback className="bg-brand-600 text-xs font-black text-white">
											{getInitials()}
										</AvatarFallback>
									</Avatar>
									<div className="hidden max-w-[140px] text-left leading-tight md:block">
										<p className="truncate text-xs font-black text-slate-900 dark:text-white">
											{user?.firstName ?? "Fortis"} {user?.lastName ?? "User"}
										</p>
										<p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
											{user?.role ?? "Portal"}
										</p>
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-64 rounded-2xl" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex items-center gap-3">
										<Avatar className="h-10 w-10">
											<AvatarFallback className="bg-brand-600 font-black text-white">{getInitials()}</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<p className="truncate text-sm font-black text-slate-900 dark:text-white">
												{user?.firstName} {user?.lastName}
											</p>
											<p className="truncate text-xs text-muted-foreground">{user?.email}</p>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" /> Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" /> Settings
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
									<LogOut className="mr-2 h-4 w-4" /> Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>
		</TooltipProvider>
	);
};
