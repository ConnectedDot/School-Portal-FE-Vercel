import { Link } from "react-router-dom";
import type { ElementType } from "react";
import {
	ArrowRight,
	Award,
	BookOpenCheck,
	BriefcaseBusiness,
	CalendarDays,
	CheckCircle2,
	Compass,
	FileText,
	GraduationCap,
	HeartHandshake,
	LibraryBig,
	Microscope,
	Palette,
	ShieldCheck,
	Sparkles,
	UsersRound,
} from "lucide-react";
import Visual from "@/assets/images/vr-glasses.jpg";
import AcademicsContent from "./Academics";

type PageConfig = {
	eyebrow: string;
	title: string;
	description: string;
	icon: ElementType;
	highlights: { title: string; text: string; icon: ElementType }[];
	sections: { title: string; items: string[] }[];
	cta?: { label: string; to: string };
};

const pages: Record<string, PageConfig> = {
	academics: {
		eyebrow: "Academics",
		title: "A disciplined academic model for confident, future-ready learners.",
		description:
			"Our academic structure blends strong classroom instruction, practical learning, digital literacy, and steady performance monitoring across every level.",
		icon: GraduationCap,
		highlights: [
			{ title: "Core mastery", text: "Clear schemes of work, assessments, and learning goals for every class.", icon: BookOpenCheck },
			{ title: "STEM exposure", text: "Science, technology, and problem-solving experiences that stretch curiosity.", icon: Microscope },
			{ title: "Progress tracking", text: "Academic visibility for school leaders, teachers, students, and guardians.", icon: Compass },
		],
		sections: [
			{ title: "Academic experience", items: ["Primary and secondary learning pathways", "Department-aligned senior classes", "Project-based learning moments", "Structured assessments and reporting"] },
			{ title: "Support systems", items: ["Teacher-led intervention", "Study skills development", "Guardian communication", "Performance review cycles"] },
		],
		cta: { label: "View admissions", to: "/admissions" },
	},
	faculty: {
		eyebrow: "Faculty",
		title: "Experienced educators shaping character, confidence, and academic growth.",
		description:
			"Our faculty culture is built around preparation, professionalism, mentorship, and meaningful relationships with learners.",
		icon: UsersRound,
		highlights: [
			{ title: "Qualified teachers", text: "Subject-aware educators with a commitment to measurable learning.", icon: Award },
			{ title: "Mentorship", text: "Guidance that supports both academic performance and personal growth.", icon: HeartHandshake },
			{ title: "Accountability", text: "Clear expectations for attendance, lesson delivery, feedback, and communication.", icon: ShieldCheck },
		],
		sections: [
			{ title: "Teacher culture", items: ["Lesson planning discipline", "Continuous professional growth", "Learner-centered communication", "Classroom leadership"] },
			{ title: "Faculty support", items: ["Digital staff workflows", "Course and student visibility", "Certification records", "Operational reporting"] },
		],
		cta: { label: "Contact school", to: "/contact" },
	},
	library: {
		eyebrow: "Library",
		title: "A reading and research environment for independent learners.",
		description:
			"The library supports study, discovery, quiet reading, academic projects, and guided access to learning resources.",
		icon: LibraryBig,
		highlights: [
			{ title: "Curated catalog", text: "Age-appropriate books and references across learning areas.", icon: BookOpenCheck },
			{ title: "Study habits", text: "A calm environment that encourages concentration and reading culture.", icon: Sparkles },
			{ title: "Resource access", text: "Structured access to learning materials for coursework and projects.", icon: Compass },
		],
		sections: [
			{ title: "Library services", items: ["Book borrowing", "Reading support", "Reference materials", "Research guidance"] },
			{ title: "Learner benefits", items: ["Improved comprehension", "Project readiness", "Independent study", "Responsible resource use"] },
		],
		cta: { label: "Open portal", to: "/login" },
	},
	events: {
		eyebrow: "Events & Calendar",
		title: "A school calendar that keeps families informed and students engaged.",
		description:
			"From academic milestones to community events, the calendar helps every family prepare for what is ahead.",
		icon: CalendarDays,
		highlights: [
			{ title: "Term planning", text: "Key dates for academic activities, assessments, and school breaks.", icon: CalendarDays },
			{ title: "Community moments", text: "Parent meetings, exhibitions, open days, and school celebrations.", icon: UsersRound },
			{ title: "Student life", text: "Competitions, club showcases, excursions, and enrichment activities.", icon: Sparkles },
		],
		sections: [
			{ title: "Calendar categories", items: ["Academic dates", "Parent engagements", "Student activities", "School-wide events"] },
			{ title: "Communication", items: ["Advance notice", "Portal reminders", "Guardian updates", "Event highlights"] },
		],
		cta: { label: "Contact office", to: "/contact" },
	},
	clubs: {
		eyebrow: "Clubs & Activities",
		title: "Beyond-classroom activities that build leadership, creativity, and teamwork.",
		description:
			"Clubs give learners room to explore interests, develop confidence, and discover strengths beyond academics.",
		icon: Palette,
		highlights: [
			{ title: "Creative expression", text: "Arts, media, presentation, and performance activities.", icon: Palette },
			{ title: "Leadership", text: "Student responsibility through teams, societies, and school initiatives.", icon: Award },
			{ title: "Collaboration", text: "Activities designed to build teamwork, confidence, and belonging.", icon: UsersRound },
		],
		sections: [
			{ title: "Activity areas", items: ["Debate and public speaking", "STEM clubs", "Creative arts", "Sports and wellness"] },
			{ title: "Outcomes", items: ["Confidence", "Teamwork", "Creativity", "Leadership discipline"] },
		],
		cta: { label: "Ask about clubs", to: "/contact" },
	},
	guidance: {
		eyebrow: "Guidance & Counseling",
		title: "Pastoral support for learner wellbeing, choices, and personal growth.",
		description:
			"Our guidance structure helps students navigate academic pressure, relationships, decisions, and future planning with care.",
		icon: HeartHandshake,
		highlights: [
			{ title: "Student wellbeing", text: "Supportive conversations and healthy school-life guidance.", icon: HeartHandshake },
			{ title: "Academic direction", text: "Help with study habits, subject choices, and performance focus.", icon: Compass },
			{ title: "Guardian partnership", text: "Thoughtful communication when students need additional support.", icon: UsersRound },
		],
		sections: [
			{ title: "Support areas", items: ["Academic counseling", "Social-emotional support", "Career awareness", "Parent collaboration"] },
			{ title: "Student outcomes", items: ["Confidence", "Better decisions", "Healthy routines", "Future readiness"] },
		],
		cta: { label: "Speak with us", to: "/contact" },
	},
	alumni: {
		eyebrow: "Alumni",
		title: "A growing network of Fortis learners, leaders, and lifelong ambassadors.",
		description:
			"The alumni community celebrates student journeys after graduation and keeps former learners connected to the school.",
		icon: BriefcaseBusiness,
		highlights: [
			{ title: "Community", text: "A network for past students to stay connected and informed.", icon: UsersRound },
			{ title: "Mentorship", text: "Opportunities for alumni to inspire current learners.", icon: HeartHandshake },
			{ title: "Legacy", text: "Stories that reflect growth, excellence, and school pride.", icon: Award },
		],
		sections: [
			{ title: "Alumni engagement", items: ["Reunion updates", "Mentorship opportunities", "Career stories", "School support initiatives"] },
			{ title: "Coming next", items: ["Alumni registry", "Graduate spotlight", "Events archive", "Networking features"] },
		],
		cta: { label: "Contact alumni office", to: "/contact" },
	},
	"privacy-policy": {
		eyebrow: "Privacy Policy",
		title: "Responsible handling of student, guardian, and school information.",
		description:
			"Fortis School treats personal and academic information with care, confidentiality, and purpose-driven access.",
		icon: ShieldCheck,
		highlights: [
			{ title: "Limited access", text: "Records are available only to authorized school roles.", icon: ShieldCheck },
			{ title: "Clear purpose", text: "Information supports learning, communication, safety, and administration.", icon: FileText },
			{ title: "Guardian trust", text: "We prioritize transparency in how school information is used.", icon: HeartHandshake },
		],
		sections: [
			{ title: "What we protect", items: ["Student records", "Guardian contact details", "Academic progress", "Portal account information"] },
			{ title: "How it is used", items: ["School administration", "Academic support", "Safety communication", "Service improvement"] },
		],
	},
	"terms-of-service": {
		eyebrow: "Terms of Service",
		title: "Clear expectations for using Fortis School digital services.",
		description:
			"These terms outline responsible access to public information, school resources, and portal services.",
		icon: FileText,
		highlights: [
			{ title: "Responsible access", text: "Users should access only the information intended for them.", icon: ShieldCheck },
			{ title: "Accurate information", text: "Families and staff should keep submitted details current.", icon: CheckCircle2 },
			{ title: "Respectful use", text: "Portal and communication tools should support school operations.", icon: HeartHandshake },
		],
		sections: [
			{ title: "User responsibilities", items: ["Protect login details", "Use services lawfully", "Report incorrect records", "Respect communication channels"] },
			{ title: "School responsibilities", items: ["Maintain service availability", "Protect school data", "Support users", "Improve digital workflows"] },
		],
	},
	"cookies-policy": {
		eyebrow: "Cookies Policy",
		title: "Simple browser storage for a smoother school website experience.",
		description:
			"The website may use essential browser storage for preferences, sessions, and basic service reliability.",
		icon: Sparkles,
		highlights: [
			{ title: "Preferences", text: "Theme and interface choices can be remembered.", icon: Sparkles },
			{ title: "Security", text: "Session-related storage helps protect authenticated access.", icon: ShieldCheck },
			{ title: "Performance", text: "Basic usage signals can help improve the website experience.", icon: Compass },
		],
		sections: [
			{ title: "Cookie purposes", items: ["Theme preferences", "Session continuity", "Security checks", "Experience improvement"] },
			{ title: "User control", items: ["Browser settings", "Clearing cookies", "Session logout", "Preference reset"] },
		],
	},
	"student-handbook": {
		eyebrow: "Student Handbook",
		title: "A practical guide to student life, expectations, and support.",
		description:
			"The handbook helps students and families understand school routines, conduct, academics, and available support.",
		icon: BookOpenCheck,
		highlights: [
			{ title: "Conduct", text: "Clear expectations for respect, discipline, and responsibility.", icon: ShieldCheck },
			{ title: "Academics", text: "Guidance for learning habits, assessments, and class participation.", icon: GraduationCap },
			{ title: "Support", text: "Where students can get help academically and personally.", icon: HeartHandshake },
		],
		sections: [
			{ title: "Handbook areas", items: ["Attendance", "Uniform and conduct", "Assessment expectations", "Digital portal use"] },
			{ title: "Student support", items: ["Class teachers", "Guidance team", "School leadership", "Guardian communication"] },
		],
		cta: { label: "Open student portal", to: "/login" },
	},
};

const PublicInfoPage = ({ page }: { page: keyof typeof pages }) => {
	const config = pages[page];
	const PageIcon = config.icon;

	return (
		<div className="overflow-x-hidden bg-white text-slate-950 dark:bg-[#050505] dark:text-white">
			<section className="relative isolate overflow-hidden py-16 md:py-24">
				<div className="absolute inset-0 bg-grid-pattern opacity-40" />
				<div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
				<div className="container relative z-10 mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
					<div>
						<div className="section-eyebrow section-eyebrow-light mb-6">
							<PageIcon className="h-4 w-4" /> {config.eyebrow}
						</div>
						<h1 className="heading-display">{config.title}</h1>
						<p className="mt-6 text-muted-premium">{config.description}</p>
						{config.cta && (
							<div className="mt-8">
								<Link to={config.cta.to} className="fortis-primary-button gap-2">
									{config.cta.label} <ArrowRight className="h-4 w-4" />
								</Link>
							</div>
						)}
					</div>
					<div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-premium dark:border-white/10">
						<img src={Visual} alt="" className="h-[24rem] w-full object-cover opacity-80" />
						<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
						<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
							<p className="text-sm font-bold uppercase text-brand-300">{config.eyebrow}</p>
							<p className="mt-2 text-2xl font-black">Fortis High School</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-12 md:py-16">
				<div className="container mx-auto grid gap-5 px-4 md:grid-cols-3 lg:px-8">
					{config.highlights.map((item) => {
						const Icon = item.icon;
						return (
							<div key={item.title} className="premium-card p-6">
								<div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
									<Icon className="h-5 w-5" />
								</div>
								<h2 className="text-lg font-black">{item.title}</h2>
								<p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
							</div>
						);
					})}
				</div>
			</section>

			<section className="bg-slate-50 py-16 dark:bg-white/[0.03]">
				<div className="container mx-auto grid gap-6 px-4 lg:grid-cols-2 lg:px-8">
					{config.sections.map((section) => (
						<div key={section.title} className="glass-strong rounded-[1.75rem] p-7">
							<h2 className="text-2xl font-black">{section.title}</h2>
							<div className="mt-6 grid gap-3">
								{section.items.map((item) => (
									<div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
										<CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
										<p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export const AcademicsPageComponent = () => <AcademicsContent />;
export const FacultyPage = () => <PublicInfoPage page="faculty" />;
export const LibraryPage = () => <PublicInfoPage page="library" />;
export const EventsPage = () => <PublicInfoPage page="events" />;
export const ClubsPage = () => <PublicInfoPage page="clubs" />;
export const GuidancePage = () => <PublicInfoPage page="guidance" />;
export const AlumniPage = () => <PublicInfoPage page="alumni" />;
export const PrivacyPolicyPage = () => <PublicInfoPage page="privacy-policy" />;
export const TermsOfServicePage = () => <PublicInfoPage page="terms-of-service" />;
export const CookiesPolicyPage = () => <PublicInfoPage page="cookies-policy" />;
export const StudentHandbookPage = () => <PublicInfoPage page="student-handbook" />;
