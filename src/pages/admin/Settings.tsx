import { Bell, CalendarDays, CheckCircle2, Lock, Settings2, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetAcademicYears } from "@/hooks/academicYear";

const Settings = () => {
	const { data } = useGetAcademicYears();
	const years = Array.isArray(data) ? data : [];
	const currentYear = years.find((year: any) => year.isCurrent) || years[0];

	return (
		<div className="space-y-6">
			<div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white px-6 py-6 shadow-premium dark:border-white/10 dark:bg-white/[0.04] sm:px-8">
				<div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(216,113,8,0.18),transparent_18rem)]" />
				<div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<Badge className="rounded-full bg-brand-50 text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
							<Settings2 className="mr-2 h-3.5 w-3.5" /> Settings
						</Badge>
						<h1 className="mt-4 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">Portal Settings</h1>
						<p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
							School-wide controls with live academic-year context from the backend.
						</p>
					</div>
					<div className="grid grid-cols-2 gap-3 sm:min-w-80">
						<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
							<p className="text-xs font-bold uppercase text-muted-foreground">Security</p>
							<p className="mt-2 flex items-center gap-2 text-lg font-black text-emerald-600 dark:text-emerald-300">
								<CheckCircle2 className="h-4 w-4" /> Active
							</p>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
							<p className="text-xs font-bold uppercase text-muted-foreground">Mode</p>
							<p className="mt-2 flex items-center gap-2 text-lg font-black text-brand-700 dark:text-brand-300">
								<Sparkles className="h-4 w-4" /> Classic
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_24rem]">
				<Card className="overflow-hidden rounded-[1.75rem] border-slate-200/80 bg-white/95 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
					<CardHeader>
						<CardTitle className="text-xl font-black">System Preferences</CardTitle>
						<CardDescription>Frontend-ready controls for admin workflows.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{[
							{ label: "Secure session enforcement", icon: ShieldCheck, enabled: true },
							{ label: "Notification delivery", icon: Bell, enabled: true },
							{ label: "Guardian access checks", icon: Lock, enabled: false },
						].map((setting) => (
							<div key={setting.label} className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
								<div className="flex items-center gap-3">
									<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-300 dark:ring-white/10">
										<setting.icon className="h-4 w-4" />
									</div>
									<div>
										<p className="font-black">{setting.label}</p>
										<p className="text-xs text-muted-foreground">Managed from the admin console</p>
									</div>
								</div>
								<Checkbox defaultChecked={setting.enabled} />
							</div>
						))}
					</CardContent>
				</Card>

				<Card className="overflow-hidden rounded-[1.75rem] border-slate-200/80 bg-white/95 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl font-black">
							<CalendarDays className="h-5 w-5" /> Academic Year
						</CardTitle>
						<CardDescription>Current calendar context.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="rounded-2xl bg-slate-50 p-5 dark:bg-white/[0.04]">
							<p className="text-xs font-bold uppercase text-muted-foreground">Session</p>
							<p className="mt-2 text-3xl font-black">{currentYear?.name || "Not configured"}</p>
						</div>
						<p className="mt-3 text-sm text-muted-foreground">
							{currentYear?.startDate ? new Date(currentYear.startDate).toLocaleDateString() : "No start date"} - {currentYear?.endDate ? new Date(currentYear.endDate).toLocaleDateString() : "No end date"}
						</p>
						<Badge className="mt-5">{currentYear?.status || "Pending"}</Badge>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Settings;
