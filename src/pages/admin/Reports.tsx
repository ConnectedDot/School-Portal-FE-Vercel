import { BarChart3, BookOpenCheck, GraduationCap, LibraryBig, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetAllUsers } from "@/hooks/admin";
import { useGetBooks } from "@/hooks/books";
import { useGetCourses } from "@/hooks/courses";

const Reports = () => {
	const { data: usersData } = useGetAllUsers(1, 100);
	const { data: coursesData } = useGetCourses(1, 100);
	const { data: booksData } = useGetBooks();

	const users = Array.isArray(usersData) ? usersData : [];
	const courses = Array.isArray(coursesData) ? coursesData : [];
	const books = Array.isArray(booksData) ? booksData : [];
	const students = users.filter((user: any) => user.role?.toLowerCase() === "student");
	const teachers = users.filter((user: any) => ["teacher", "faculty"].includes(user.role?.toLowerCase()));

	const metrics = [
		{ label: "Students", value: students.length, icon: GraduationCap, progress: 82 },
		{ label: "Faculty", value: teachers.length, icon: Users, progress: 68 },
		{ label: "Courses", value: courses.length, icon: BookOpenCheck, progress: 74 },
		{ label: "Books", value: books.length, icon: LibraryBig, progress: 58 },
	];

	return (
		<div className="space-y-6">
			<div>
				<Badge className="rounded-full bg-brand-50 text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
					<BarChart3 className="mr-2 h-3.5 w-3.5" /> Reports
				</Badge>
				<h1 className="mt-3 text-3xl font-black">Reports & Analytics</h1>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
					Operational snapshots built from the currently available admin endpoints.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{metrics.map((metric) => (
					<Card key={metric.label} className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
						<CardContent className="p-5">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-bold uppercase text-muted-foreground">{metric.label}</p>
									<p className="mt-3 text-3xl font-black">{metric.value}</p>
								</div>
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
									<metric.icon className="h-5 w-5" />
								</div>
							</div>
							<Progress value={metric.progress} className="mt-5" />
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
				<CardHeader>
					<CardTitle>Insights Queue</CardTitle>
					<CardDescription>Report modules ready to connect once dedicated analytics endpoints are exposed.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-3">
					{["Enrollment movement", "Faculty workload", "Library circulation"].map((item, index) => (
						<div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
							<p className="text-sm font-black">{item}</p>
							<p className="mt-2 text-sm text-muted-foreground">Phase {index + 1} analytics surface</p>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default Reports;
