import { CalendarDays, CheckCircle2, Clock, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAcademicYears } from "@/hooks/academicYear";
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const Calendar = () => {
	const { data, isLoading } = useGetAcademicYears();
	const years = Array.isArray(data) ? data : [];
	const currentYear = years.find((year: any) => year.isCurrent) || years[0];

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Badge className="rounded-full bg-brand-50 text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
					<CalendarDays className="mr-2 h-3.5 w-3.5" /> Calendar
				</Badge>
				<DataSourceFlag source="api" />
			</div>
			<div>
				<h1 className="mt-3 text-3xl font-black">Academic Calendar</h1>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
					Academic year planning connected to the deployed `/academic-years` endpoint.
				</p>
			</div>

			<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
				<CardHeader>
					<CardTitle>Current Academic Year</CardTitle>
					<CardDescription>{isLoading ? "Loading academic years..." : currentYear ? "Active planning window" : "No academic year found"}</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-3">
					{[
						{ label: "Name", value: currentYear?.name || "Not configured", icon: GraduationCap },
						{ label: "Start", value: currentYear?.startDate ? new Date(currentYear.startDate).toLocaleDateString() : "Pending", icon: Clock },
						{ label: "Status", value: currentYear?.status || "Draft", icon: CheckCircle2 },
					].map((metric) => (
						<div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
							<metric.icon className="h-5 w-5 text-brand-600" />
							<p className="mt-4 text-xs font-bold uppercase text-muted-foreground">{metric.label}</p>
							<p className="mt-2 text-xl font-black">{metric.value}</p>
						</div>
					))}
				</CardContent>
			</Card>

			<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
				<CardHeader>
					<CardTitle>Year Registry</CardTitle>
					<CardDescription>Configured academic years from the backend.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					{years.map((year: any) => (
						<div key={year.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="font-bold">{year.name}</p>
								<p className="text-sm text-muted-foreground">
									{year.startDate ? new Date(year.startDate).toLocaleDateString() : "No start"} - {year.endDate ? new Date(year.endDate).toLocaleDateString() : "No end"}
								</p>
							</div>
							<div className="flex gap-2">
								{year.isCurrent && <Badge>Current</Badge>}
								<Badge variant="outline">{year.status || "ACTIVE"}</Badge>
							</div>
						</div>
					))}
					{years.length === 0 && <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">No academic years have been configured.</div>}
				</CardContent>
			</Card>
		</div>
	);
};

export default Calendar;
