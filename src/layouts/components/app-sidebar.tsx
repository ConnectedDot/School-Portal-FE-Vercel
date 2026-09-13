"use client";

import * as React from "react";
import {
	Award,
	Baby,
	BarChart3,
	Bell,
	BookOpen,
	BookOpenCheck,
	Calendar,
	ClipboardCheck,
	CreditCard,
	FileText,
	GraduationCap,
	LayoutDashboard,
	MessageSquare,
	Settings2,
	ShieldCheck,
	UserCheck,
	UserCircle,
	Users,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { AdnPaths, FcyPaths, GdnPaths, SdtPaths } from "@/router/paths";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";

const getNavigationByRole = (role?: string) => {
	const normalizedRole = role?.toUpperCase();

	switch (normalizedRole) {
		case "ADMINISTRATOR":
		case "ADMIN":
			return [
				{ title: "Dashboard", url: AdnPaths.DASH, icon: LayoutDashboard },
				{
					title: "People Management",
					url: "#",
					icon: Users,
					items: [
						{ title: "All Users", url: AdnPaths.USERS },
						{ title: "Students", url: AdnPaths.STUDENTS },
						{ title: "Faculty", url: AdnPaths.FACULTY },
					],
				},
				{
					title: "Academic Setup",
					url: "#",
					icon: BookOpenCheck,
					items: [
						{ title: "Courses", url: AdnPaths.COURSES },
						// Library navigation paused; implementation is retained for future use.
						{ title: "Grades", url: AdnPaths.GRADES },
					],
				},
				{ title: "Attendance", url: AdnPaths.ATTENDANCE, icon: ClipboardCheck },
				{ title: "Notifications", url: AdnPaths.NOTIFICATIONS, icon: Bell },
				{ title: "Communication", url: AdnPaths.COMMUNICATION, icon: MessageSquare },
				{ title: "Calendar", url: AdnPaths.CALENDAR, icon: Calendar },
				{ title: "Reports", url: AdnPaths.REPORTS, icon: BarChart3 },
				{ title: "Settings", url: AdnPaths.SETTINGS, icon: Settings2 },
			];
		case "FACULTY":
		case "TEACHER":
			return [
				{ title: "Dashboard", url: FcyPaths.DASH, icon: LayoutDashboard },
				{ title: "My Profile", url: FcyPaths.PROFILE, icon: UserCircle },
				{ title: "My Students", url: FcyPaths.STUDENTS, icon: GraduationCap },
				{ title: "My Courses", url: FcyPaths.COURSES, icon: BookOpenCheck },
				{ title: "Certifications", url: FcyPaths.CERTIFICATIONS, icon: Award },
				{ title: "Assignments", url: FcyPaths.ASSIGNMENTS, icon: FileText },
				{ title: "Grades", url: FcyPaths.GRADES, icon: ClipboardCheck },
				{ title: "Attendance", url: FcyPaths.ATTENDANCE, icon: ClipboardCheck },
				{ title: "Communication", url: FcyPaths.COMMUNICATION, icon: MessageSquare },
				{ title: "Calendar", url: FcyPaths.CALENDAR, icon: Calendar },
				{ title: "Reports", url: FcyPaths.REPORTS, icon: BarChart3 },
			];
		case "STUDENT":
			return [
				{ title: "Dashboard", url: SdtPaths.DASH, icon: LayoutDashboard },
				{ title: "Enroll in Courses", url: SdtPaths.ENROLL, icon: BookOpen },
				// My Enrollments is consolidated into My Courses.
				{ title: "My Courses", url: SdtPaths.COURSES, icon: BookOpenCheck },
				{ title: "Assignments", url: SdtPaths.ASSIGNMENTS, icon: FileText },
				{ title: "Grades", url: SdtPaths.GRADES, icon: ClipboardCheck },
				{ title: "Attendance", url: SdtPaths.ATTENDANCE, icon: ClipboardCheck },
				{ title: "Communication", url: SdtPaths.COMMUNICATION, icon: MessageSquare },
				{ title: "Calendar", url: SdtPaths.CALENDAR, icon: Calendar },
				{ title: "Profile", url: SdtPaths.PROFILE, icon: UserCircle },
			];
		case "GUARDIAN":
		case "PARENT":
			return [
				{ title: "Dashboard", url: GdnPaths.DASH, icon: LayoutDashboard },
				{ title: "My Children", url: GdnPaths.CHILDREN, icon: Baby },
				{ title: "Grades", url: GdnPaths.GRADES, icon: ClipboardCheck },
				{ title: "Attendance", url: GdnPaths.ATTENDANCE, icon: ClipboardCheck },
				{ title: "Communication", url: GdnPaths.COMMUNICATION, icon: MessageSquare },
				{ title: "Calendar", url: GdnPaths.CALENDAR, icon: Calendar },
				{ title: "Payments", url: GdnPaths.PAYMENTS, icon: CreditCard },
			];
		default:
			return [{ title: "Dashboard", url: "#", icon: LayoutDashboard }];
	}
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = React.useContext(AuthContext);

	const navItems = React.useMemo(() => getNavigationByRole(user?.role), [user?.role]);

	const data = {
		user: {
			name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Fortis User",
			email: user?.email || "portal@fortis.school",
			avatar: user?.avatar || "",
			initials: `${user?.firstName?.[0] || "F"}${user?.lastName?.[0] || "S"}`,
		},
		teams: [
			{
				name: "Fortis School",
				logo: ShieldCheck,
				plan: "Portal Suite",
			},
		],
		navMain: navItems,
	};

	return (
		<Sidebar collapsible="icon" className="border-r border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#080808]/95" {...props}>
			<div className="flex h-full flex-col p-2.5">
				<SidebarHeader className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
					<TeamSwitcher teams={data.teams} />
				</SidebarHeader>

				<SidebarContent className="custom-scrollbar mt-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-2 shadow-sm dark:border-white/10 dark:bg-white/[0.035]">
					<NavMain items={data.navMain} />
				</SidebarContent>

				<SidebarFooter className="mt-3 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
					<NavUser user={data.user} />
				</SidebarFooter>
			</div>
			<SidebarRail />
		</Sidebar>
	);
}
