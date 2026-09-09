import { Award, BookOpenCheck, GraduationCap, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetCourses } from "@/hooks/courses";

const Grades = () => {
	const { data, isLoading } = useGetCourses(1, 100);
	const courses = Array.isArray(data) ? data : [];
	const assessedCourses = courses.filter((course: any) => course._count?.enrollments || course.enrollmentCount);

	return (
		<div className="space-y-6">
			<div>
				<Badge className="rounded-full bg-brand-50 text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
					<Award className="mr-2 h-3.5 w-3.5" /> Grades
				</Badge>
				<h1 className="mt-3 text-3xl font-black">Gradebook Overview</h1>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
					An admin-ready gradebook shell linked to live courses while grade-specific endpoints are pending.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				{[
					{ label: "Courses", value: courses.length, icon: BookOpenCheck },
					{ label: "Assessed", value: assessedCourses.length, icon: GraduationCap },
					{ label: "Average", value: courses.length ? "78%" : "0%", icon: TrendingUp },
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
					<CardTitle>Course Performance Bands</CardTitle>
					<CardDescription>Visual placeholders mapped to courses already available from `/course/all`.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{courses.slice(0, 6).map((course: any, index) => {
						const score = 72 + ((index * 7) % 21);
						return (
							<div key={course.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
								<div className="flex items-center justify-between gap-4">
									<div>
										<p className="font-bold">{course.title}</p>
										<p className="text-sm text-muted-foreground">{course.subject || "General subject"}</p>
									</div>
									<Badge variant="outline">{score}%</Badge>
								</div>
								<Progress value={score} className="mt-4" />
							</div>
						);
					})}
					{courses.length === 0 && <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">No courses available yet.</div>}
				</CardContent>
			</Card>
		</div>
	);
};

export default Grades;
