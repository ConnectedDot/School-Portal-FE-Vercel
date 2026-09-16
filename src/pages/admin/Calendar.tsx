import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock, GraduationCap, Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGetAcademicYears } from "@/hooks/academicYear";
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Holiday {
	id: string;
	name: string;
	startDate: string;
	endDate?: string;
	type: 'PUBLIC_HOLIDAY' | 'SCHOOL_BREAK' | 'EVENT';
	description?: string;
}

const Calendar = () => {
	const { data, isLoading } = useGetAcademicYears();
	const years = Array.isArray(data) ? data : [];
	const currentYear = years.find((year: any) => year.isCurrent) || years[0];

	// State for year toggle
	const [selectedYearId, setSelectedYearId] = useState<string>(currentYear?.id || '');
	const [showOnlyActive, setShowOnlyActive] = useState(true);

	// State for holidays/breaks
	const [holidays, setHolidays] = useState<Holiday[]>([
		{
			id: '1',
			name: 'Christmas Break',
			startDate: '2024-12-20',
			endDate: '2025-01-05',
			type: 'SCHOOL_BREAK',
			description: 'End of first term break'
		},
		{
			id: '2',
			name: 'Mid-term Break',
			startDate: '2025-02-15',
			endDate: '2025-02-21',
			type: 'SCHOOL_BREAK',
			description: 'Second term mid-term break'
		},
		{
			id: '3',
			name: 'Easter Holiday',
			startDate: '2025-04-18',
			endDate: '2025-04-21',
			type: 'PUBLIC_HOLIDAY',
			description: 'Easter public holiday'
		},
		{
			id: '4',
			name: 'Summer Break',
			startDate: '2025-07-15',
			endDate: '2025-09-10',
			type: 'SCHOOL_BREAK',
			description: 'End of academic year break'
		},
	]);

	const [isAddingHoliday, setIsAddingHoliday] = useState(false);
	const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({
		name: '',
		startDate: '',
		endDate: '',
		type: 'SCHOOL_BREAK',
		description: '',
	});

	// Terms data (could be fetched from API in the future)
	const terms = [
		{
			id: '1',
			name: 'First Term',
			startDate: '2024-09-10',
			endDate: '2024-12-20',
			status: 'COMPLETED',
		},
		{
			id: '2',
			name: 'Second Term',
			startDate: '2025-01-06',
			endDate: '2025-04-10',
			status: 'ACTIVE',
		},
		{
			id: '3',
			name: 'Third Term',
			startDate: '2025-04-22',
			endDate: '2025-07-15',
			status: 'PENDING',
		},
	];

	const selectedYear = years.find((year: any) => year.id === selectedYearId) || currentYear;
	const displayedYears = showOnlyActive ? years.filter((year: any) => year.isCurrent) : years;

	const handleAddHoliday = () => {
		if (!newHoliday.name || !newHoliday.startDate) {
			toast.error('Please fill in required fields');
			return;
		}

		const holiday: Holiday = {
			id: Date.now().toString(),
			name: newHoliday.name,
			startDate: newHoliday.startDate,
			endDate: newHoliday.endDate,
			type: newHoliday.type || 'SCHOOL_BREAK',
			description: newHoliday.description,
		};

		setHolidays([...holidays, holiday]);
		setNewHoliday({
			name: '',
			startDate: '',
			endDate: '',
			type: 'SCHOOL_BREAK',
			description: '',
		});
		setIsAddingHoliday(false);
		toast.success('Holiday/break added successfully');
	};

	const handleDeleteHoliday = (id: string) => {
		setHolidays(holidays.filter((h) => h.id !== id));
		toast.success('Holiday/break deleted');
	};

	const getTermStatus = (status: string) => {
		switch (status) {
			case 'ACTIVE':
				return <Badge className="bg-green-500">Active</Badge>;
			case 'COMPLETED':
				return <Badge variant="secondary">Completed</Badge>;
			case 'PENDING':
				return <Badge variant="outline">Pending</Badge>;
			default:
				return <Badge variant="outline">{status}</Badge>;
		}
	};

	const getHolidayTypeColor = (type: string) => {
		switch (type) {
			case 'PUBLIC_HOLIDAY':
				return 'bg-blue-50 text-blue-700 border-blue-200';
			case 'SCHOOL_BREAK':
				return 'bg-purple-50 text-purple-700 border-purple-200';
			case 'EVENT':
				return 'bg-orange-50 text-orange-700 border-orange-200';
			default:
				return 'bg-gray-50 text-gray-700 border-gray-200';
		}
	};

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
					Manage academic years, terms, and school holidays/breaks
				</p>
			</div>

			{/* Year Toggle Section */}
			<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Academic Year Selector</CardTitle>
							<CardDescription>Toggle between academic years to view details</CardDescription>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="active-only"
								checked={showOnlyActive}
								onCheckedChange={setShowOnlyActive}
							/>
							<Label htmlFor="active-only" className="text-sm">
								Active Only
							</Label>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{displayedYears.map((year: any) => (
							<div
								key={year.id}
								onClick={() => setSelectedYearId(year.id)}
								className={`cursor-pointer rounded-2xl border p-4 transition-all ${
									selectedYearId === year.id
										? 'border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/20'
										: 'border-slate-200 bg-slate-50/80 hover:border-brand-300 dark:border-white/10 dark:bg-white/[0.03]'
								}`}
							>
								<div className="flex items-start justify-between">
									<div>
										<p className="font-bold">{year.name}</p>
										<p className="text-xs text-muted-foreground mt-1">
											{year.startDate ? new Date(year.startDate).toLocaleDateString() : 'No start'} -{' '}
											{year.endDate ? new Date(year.endDate).toLocaleDateString() : 'No end'}
										</p>
									</div>
									{year.isCurrent && (
										<Badge className="text-xs">Current</Badge>
									)}
								</div>
							</div>
						))}
					</div>
					{displayedYears.length === 0 && (
						<div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
							No academic years available
						</div>
					)}
				</CardContent>
			</Card>

			{/* Selected Year Overview */}
			{selectedYear && (
				<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
					<CardHeader>
						<CardTitle>{selectedYear.name} Overview</CardTitle>
						<CardDescription>Current academic year details</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-3">
						{[
							{ label: "Name", value: selectedYear.name, icon: GraduationCap },
							{ label: "Start", value: selectedYear.startDate ? new Date(selectedYear.startDate).toLocaleDateString() : "Pending", icon: Clock },
							{ label: "Status", value: selectedYear.isCurrent ? "Current" : "Inactive", icon: CheckCircle2 },
						].map((metric) => (
							<div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
								<metric.icon className="h-5 w-5 text-brand-600" />
								<p className="mt-4 text-xs font-bold uppercase text-muted-foreground">{metric.label}</p>
								<p className="mt-2 text-xl font-black">{metric.value}</p>
							</div>
						))}
					</CardContent>
				</Card>
			)}

			{/* Terms and Holidays/Breaks Tabs */}
			<Tabs defaultValue="terms" className="space-y-4">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="terms">Terms</TabsTrigger>
					<TabsTrigger value="holidays">Holidays & Breaks</TabsTrigger>
				</TabsList>

				{/* Terms Tab */}
				<TabsContent value="terms" className="space-y-4">
					<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
						<CardHeader>
							<CardTitle>Academic Terms</CardTitle>
							<CardDescription>School terms for the selected academic year</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							{terms.map((term) => (
								<div
									key={term.id}
									className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
								>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<CalendarIcon className="h-4 w-4 text-brand-600" />
											<p className="font-bold">{term.name}</p>
											{getTermStatus(term.status)}
										</div>
										<p className="text-sm text-muted-foreground mt-1">
											{new Date(term.startDate).toLocaleDateString()} - {new Date(term.endDate).toLocaleDateString()}
										</p>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>

				{/* Holidays & Breaks Tab */}
				<TabsContent value="holidays" className="space-y-4">
					<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Holidays & Breaks</CardTitle>
									<CardDescription>Public holidays and school breaks</CardDescription>
								</div>
								<Dialog open={isAddingHoliday} onOpenChange={setIsAddingHoliday}>
									<DialogTrigger asChild>
										<Button size="sm">
											<Plus className="h-4 w-4 mr-2" />
											Add Holiday/Break
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Add Holiday or Break</DialogTitle>
											<DialogDescription>
												Add a new public holiday or school break to the calendar
											</DialogDescription>
										</DialogHeader>
										<div className="space-y-4 py-4">
											<div className="space-y-2">
												<Label htmlFor="name">Name *</Label>
												<Input
													id="name"
													placeholder="e.g., Christmas Break"
													value={newHoliday.name}
													onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="type">Type *</Label>
												<Select
													value={newHoliday.type}
													onValueChange={(value: any) => setNewHoliday({ ...newHoliday, type: value })}
												>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="SCHOOL_BREAK">School Break</SelectItem>
														<SelectItem value="PUBLIC_HOLIDAY">Public Holiday</SelectItem>
														<SelectItem value="EVENT">Event</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="grid grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="startDate">Start Date *</Label>
													<Input
														id="startDate"
														type="date"
														value={newHoliday.startDate}
														onChange={(e) => setNewHoliday({ ...newHoliday, startDate: e.target.value })}
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="endDate">End Date</Label>
													<Input
														id="endDate"
														type="date"
														value={newHoliday.endDate}
														onChange={(e) => setNewHoliday({ ...newHoliday, endDate: e.target.value })}
													/>
												</div>
											</div>
											<div className="space-y-2">
												<Label htmlFor="description">Description</Label>
												<Textarea
													id="description"
													placeholder="Additional details..."
													value={newHoliday.description}
													onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
												/>
											</div>
										</div>
										<DialogFooter>
											<Button variant="outline" onClick={() => setIsAddingHoliday(false)}>
												Cancel
											</Button>
											<Button onClick={handleAddHoliday}>Add Holiday/Break</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						</CardHeader>
						<CardContent className="space-y-3">
							{holidays.length > 0 ? (
								holidays.map((holiday) => (
									<div
										key={holiday.id}
										className={`flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${getHolidayTypeColor(holiday.type)}`}
									>
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<p className="font-bold">{holiday.name}</p>
												<Badge variant="outline" className="text-xs">
													{holiday.type.replace('_', ' ')}
												</Badge>
											</div>
											<p className="text-sm mt-1">
												{new Date(holiday.startDate).toLocaleDateString()}
												{holiday.endDate && ` - ${new Date(holiday.endDate).toLocaleDateString()}`}
											</p>
											{holiday.description && (
												<p className="text-xs mt-1 opacity-80">{holiday.description}</p>
											)}
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleDeleteHoliday(holiday.id)}
											className="text-destructive hover:text-destructive"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								))
							) : (
								<div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
									No holidays or breaks added yet
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Calendar;
