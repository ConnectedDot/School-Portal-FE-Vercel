import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';
import { dummyStudentGrades, dummyGradeSummary } from '@/data/student/grades';

const StudentGrades = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">My Grades</h1>
                <DataSourceFlag source="dummy" />
            </div>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dummyGradeSummary.averageScore}%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Average Grade</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dummyGradeSummary.averageGrade}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Subjects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dummyGradeSummary.subjects}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Highest Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dummyGradeSummary.highestScore}%</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Grade Records
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {dummyStudentGrades.map((grade) => (
                            <div key={grade.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div>
                                    <div className="font-semibold">{grade.subject}</div>
                                    <div className="text-sm text-muted-foreground">{grade.term} Term - {grade.academicYear}</div>
                                    <div className="text-xs text-muted-foreground">Teacher: {grade.teacher}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">{grade.score}%</div>
                                    <div className="text-sm text-muted-foreground">Grade: {grade.grade}</div>
                                    <div className="text-xs text-muted-foreground">Class Avg: {grade.classAverage}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentGrades;
