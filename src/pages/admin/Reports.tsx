import { useContext } from "react";
import { BarChart3, BookOpenCheck, GraduationCap, LibraryBig, Users, FileText, TrendingUp, Award, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetAllUsers } from "@/hooks/admin";
import { useGetBooks } from "@/hooks/books";
import { useGetCourses } from "@/hooks/courses";
import { AuthContext } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
	const { user } = useContext(AuthContext);
	const userRole = user?.role?.toUpperCase() || '';

	const { data: usersData } = useGetAllUsers(1, 100);
	const { data: coursesData } = useGetCourses(1, 100);
	const { data: booksData } = useGetBooks();

	const users = Array.isArray(usersData) ? usersData : [];
	const courses = Array.isArray(coursesData) ? coursesData : [];
	const books = Array.isArray(booksData) ? booksData : [];
	const students = users.filter((user: any) => user.role?.toLowerCase() === "student");
	const teachers = users.filter((user: any) => ["teacher", "faculty"].includes(user.role?.toLowerCase()));

	// Role-based metrics
	const adminMetrics = [
		{ label: "Students", value: students.length, icon: GraduationCap, progress: 82 },
		{ label: "Faculty", value: teachers.length, icon: Users, progress: 68 },
		{ label: "Courses", value: courses.length, icon: BookOpenCheck, progress: 74 },
		{ label: "Books", value: books.length, icon: LibraryBig, progress: 58 },
	];

	const teacherMetrics = [
		{ label: "My Courses", value: 5, icon: BookOpenCheck, progress: 75 },
		{ label: "My Students", value: 120, icon: GraduationCap, progress: 85 },
		{ label: "Assignments", value: 12, icon: FileText, progress: 60 },
		{ label: "Avg Grade", value: "85%", icon: Award, progress: 85 },
	];

	const studentMetrics = [
		{ label: "Enrolled Courses", value: 8, icon: BookOpenCheck, progress: 100 },
		{ label: "Completed", value: 6, icon: Award, progress: 75 },
		{ label: "Avg Score", value: "78%", icon: TrendingUp, progress: 78 },
		{ label: "Attendance", value: "92%", icon: Users, progress: 92 },
	];

	const getMetricsByRole = () => {
		switch (userRole) {
			case 'ADMINISTRATOR':
				return adminMetrics;
			case 'TEACHER':
				return teacherMetrics;
			case 'STUDENT':
				return studentMetrics;
			default:
				return adminMetrics;
		}
	};

	const metrics = getMetricsByRole();

	// Role-based report sections
	const renderAdminReports = () => (
		<Tabs defaultValue="overview" className="space-y-4">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="academic">Academic</TabsTrigger>
				<TabsTrigger value="financial">Financial</TabsTrigger>
				<TabsTrigger value="attendance">Attendance</TabsTrigger>
			</TabsList>

			<TabsContent value="overview" className="space-y-4">
				<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
					<CardHeader>
						<CardTitle>School Overview</CardTitle>
						<CardDescription>General statistics and enrollment data</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">Total Enrollment</span>
								<span className="text-2xl font-bold">{students.length}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">Faculty Members</span>
								<span className="text-2xl font-bold">{teachers.length}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">Active Courses</span>
								<span className="text-2xl font-bold">{courses.length}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="academic" className="space-y-4">
				<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
					<CardHeader>
						<CardTitle>Academic Performance</CardTitle>
						<CardDescription>Student performance and course completion rates</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Academic performance reports will be available once grade and assessment endpoints are integrated.
						</p>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="financial" className="space-y-4">
				<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
					<CardHeader>
						<CardTitle>Financial Reports</CardTitle>
						<CardDescription>Revenue, expenses, and fee collection</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Financial reports will be available once payment and fee endpoints are integrated.
						</p>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="attendance" className="space-y-4">
				<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
					<CardHeader>
						<CardTitle>Attendance Reports</CardTitle>
						<CardDescription>Student and staff attendance tracking</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Attendance reports will be available once attendance summary endpoints are integrated.
						</p>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);

	const renderTeacherReports = () => (
		<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
			<CardHeader>
				<CardTitle>My Teaching Reports</CardTitle>
				<CardDescription>Course performance and student progress</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
					<p className="text-sm font-bold">Course Completion Rate</p>
					<p className="mt-2 text-2xl font-black">78%</p>
					<Progress value={78} className="mt-3" />
				</div>
				<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
					<p className="text-sm font-bold">Average Student Performance</p>
					<p className="mt-2 text-2xl font-black">85%</p>
					<Progress value={85} className="mt-3" />
				</div>
				<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
					<p className="text-sm font-bold">Assignment Submission Rate</p>
					<p className="mt-2 text-2xl font-black">92%</p>
					<Progress value={92} className="mt-3" />
				</div>
			</CardContent>
		</Card>
	);

	const renderStudentReports = () => (
		<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
			<CardHeader>
				<CardTitle>My Academic Report</CardTitle>
				<CardDescription>Your performance and progress summary</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
					<p className="text-sm font-bold">Overall Grade</p>
					<p className="mt-2 text-2xl font-black">B+</p>
					<p className="text-xs text-muted-foreground mt-1">Average: 78%</p>
				</div>
				<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
					<p className="text-sm font-bold">Course Progress</p>
					<p className="mt-2 text-2xl font-black">75%</p>
					<Progress value={75} className="mt-3" />
				</div>
				<div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
					<p className="text-sm font-bold">Attendance Rate</p>
					<p className="mt-2 text-2xl font-black">92%</p>
					<Progress value={92} className="mt-3" />
				</div>
			</CardContent>
		</Card>
	);

	const renderRoleBasedReports = () => {
		switch (userRole) {
			case 'ADMINISTRATOR':
				return renderAdminReports();
			case 'TEACHER':
				return renderTeacherReports();
			case 'STUDENT':
				return renderStudentReports();
			default:
				return renderAdminReports();
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<Badge className="rounded-full bg-brand-50 text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
					<BarChart3 className="mr-2 h-3.5 w-3.5" /> Reports
				</Badge>
				<h1 className="mt-3 text-3xl font-black">Reports & Analytics</h1>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
					{userRole === 'ADMINISTRATOR' && 'Comprehensive school reports and analytics'}
					{userRole === 'TEACHER' && 'Your teaching performance and student progress reports'}
					{userRole === 'STUDENT' && 'Your academic performance and progress reports'}
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

			{/* Role-based report sections */}
			{renderRoleBasedReports()}

			{/* COMMENTED OUT: Insights Queue - as per requirements
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
			*/}
		</div>
	);
};

export default Reports;
