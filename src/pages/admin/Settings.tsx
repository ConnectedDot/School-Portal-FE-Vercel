import { useState } from "react";
import { Bell, CalendarDays, CheckCircle2, Lock, Settings2, ShieldCheck, Sparkles, History, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useGetAcademicYears } from "@/hooks/academicYear";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Settings = () => {
	const { data } = useGetAcademicYears();
	const years = Array.isArray(data) ? data : [];
	const currentYear = years.find((year: any) => year.isCurrent) || years[0];

	// State for result backdating
	const [selectedBackdateYear, setSelectedBackdateYear] = useState<string>(currentYear?.id || '');
	const [isBackdating, setIsBackdating] = useState(false);

	const handleSaveBackdateYear = () => {
		setIsBackdating(true);
		
		// Simulate saving (in production, this would call an API)
		setTimeout(() => {
			const selectedYear = years.find((y: any) => y.id === selectedBackdateYear);
			toast.success(`Results backdating set to ${selectedYear?.name || 'selected year'}`);
			setIsBackdating(false);
		}, 1000);
	};

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
				{/* COMMENTED OUT: System Preferences - as per requirements
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
				*/}

				{/* Result Backdating Section */}
				<Card className="overflow-hidden rounded-[1.75rem] border-slate-200/80 bg-white/95 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl font-black">
							<History className="h-5 w-5" /> Result Backdating
						</CardTitle>
						<CardDescription>Set academic year for historical result viewing and management.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="backdate-year">Select Academic Year</Label>
							<Select
								value={selectedBackdateYear}
								onValueChange={setSelectedBackdateYear}
							>
								<SelectTrigger id="backdate-year">
									<SelectValue placeholder="Select year for results" />
								</SelectTrigger>
								<SelectContent>
									{years.map((year: any) => (
										<SelectItem key={year.id} value={year.id}>
											{year.name} 
											{year.isCurrent && ' (Current)'}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<p className="text-xs text-muted-foreground">
								Results will be filtered and displayed for the selected academic year
							</p>
						</div>

						{selectedBackdateYear && (
							<div className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/20">
								<div className="flex items-start gap-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
										<History className="h-4 w-4" />
									</div>
									<div className="flex-1">
										<p className="text-sm font-bold text-blue-900 dark:text-blue-100">
											Backdating Active
										</p>
										<p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
											{years.find((y: any) => y.id === selectedBackdateYear)?.name}
										</p>
									</div>
								</div>
							</div>
						)}

						<Button 
							onClick={handleSaveBackdateYear}
							disabled={!selectedBackdateYear || isBackdating}
							className="w-full"
						>
							{isBackdating ? (
								<>
									<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
									Saving...
								</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Apply Backdate Setting
								</>
							)}
						</Button>

						<div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/40 dark:bg-orange-950/20">
							<p className="text-xs font-bold text-orange-900 dark:text-orange-100">
								⚠️ Note
							</p>
							<p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
								This setting allows viewing and managing results from previous academic years. 
								Current year operations remain unaffected.
							</p>
						</div>
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
						<Badge className="mt-5">{currentYear?.isCurrent ? "Current Year" : "Inactive"}</Badge>
					</CardContent>
				</Card>
			</div>

			{/* Available Academic Years */}
			<Card className="overflow-hidden rounded-[1.75rem] border-slate-200/80 bg-white/95 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
				<CardHeader>
					<CardTitle className="text-xl font-black">Available Academic Years</CardTitle>
					<CardDescription>All configured academic years for result management</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{years.map((year: any) => (
							<div
								key={year.id}
								className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]"
							>
								<div className="flex items-start justify-between">
									<div>
										<p className="font-bold">{year.name}</p>
										<p className="text-xs text-muted-foreground mt-1">
											{year.startDate ? new Date(year.startDate).getFullYear() : '—'}
										</p>
									</div>
									{year.isCurrent && (
										<Badge className="text-xs">Active</Badge>
									)}
								</div>
								<p className="text-xs text-muted-foreground mt-2">
									{year.startDate ? new Date(year.startDate).toLocaleDateString() : 'No start'} - 
									{year.endDate ? new Date(year.endDate).toLocaleDateString() : 'No end'}
								</p>
							</div>
						))}
					</div>
					{years.length === 0 && (
						<div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
							No academic years configured
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Settings;
