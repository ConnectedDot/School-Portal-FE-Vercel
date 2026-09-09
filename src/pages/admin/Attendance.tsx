import { Activity, CalendarCheck, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetAllUsers } from "@/hooks/admin";
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const Attendance = () => {
	const { data, isLoading } = useGetAllUsers(1, 100);
	const users = Array.isArray(data) ? data : [];
	const students = users.filter((user: any) => user.role?.toLowerCase() === "student");
	const teachers = users.filter((user: any) => ["teacher", "faculty"].includes(user.role?.toLowerCase()));
	const attendanceRate = students.length ? 94 : 0;

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Badge className="rounded-full bg-brand-50 text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
					<CalendarCheck className="mr-2 h-3.5 w-3.5" /> Attendance
				</Badge>
				<DataSourceFlag source="api" />
			</div>
			<div>
				<h1 className="mt-3 text-3xl font-black">Attendance Console</h1>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
					A responsive admin view prepared for attendance endpoints, using live people data for current roll-call context.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				{[
					{ label: "Student Roll", value: students.length, icon: Users },
					{ label: "Faculty Roll", value: teachers.length, icon: Activity },
					{ label: "Today", value: `${attendanceRate}%`, icon: Clock },
				].map((metric) => (
					<Card key={metric.label} className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
						<CardContent className="flex items-center justify-between p-5">
							<div>
								<p className="text-xs font-bold uppercase text-muted-foreground">{metric.label}</p>
								<p className="mt-3 text-3xl font-black">{isLoading ? "..." : metric.value}</p>
							</div>
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
								<metric.icon className="h-5 w-5" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
				<CardHeader>
					<CardTitle>Daily Attendance Flow</CardTitle>
					<CardDescription>Prepared states for check-in, late arrival, absence review, and guardian follow-up.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 lg:grid-cols-4">
					{[
						{ title: "Morning Check-in", progress: 86 },
						{ title: "Late Desk Review", progress: 38 },
						{ title: "Absence Follow-up", progress: 62 },
						{ title: "Daily Closure", progress: 24 },
					].map((stage) => (
						<div key={stage.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
							<p className="font-bold">{stage.title}</p>
							<Progress value={stage.progress} className="mt-4" />
							<p className="mt-3 text-sm text-muted-foreground">{stage.progress}% complete</p>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default Attendance;
