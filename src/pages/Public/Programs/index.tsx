import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Globe2, Microscope, School, UsersRound } from "lucide-react";

const programs = [
	{ title: "Primary School", tag: "Foundation Years", icon: School, text: "Structured foundational learning with strong literacy, numeracy, creativity, and character development." },
	{ title: "Secondary School", tag: "Academic Excellence", icon: BookOpen, text: "Focused academic progression, assessment clarity, subject mastery, and leadership preparation." },
	{ title: "STEM & Innovation", tag: "Future Skills", icon: Microscope, text: "Digital literacy, science projects, problem solving, and practical learning experiences." },
	{ title: "International Programs", tag: "Global Citizens", icon: Globe2, text: "Exposure-driven programs that prepare learners for broader academic and personal opportunities." },
];

const ProgramsPage = () => {
	return (
		<div className="overflow-x-hidden bg-white text-slate-950 dark:bg-[#050505] dark:text-white">
			<section className="relative isolate py-16 md:py-24">
				<div className="absolute inset-0 bg-fortis-radial" />
				<div className="container relative z-10 mx-auto px-4 lg:px-8">
					<div className="max-w-3xl">
						<div className="section-eyebrow section-eyebrow-light mb-6">Academic Programs</div>
						<h1 className="heading-display">Learning pathways with clarity, discipline, and measurable growth.</h1>
						<p className="mt-6 text-muted-premium">Explore the major academic tracks Fortis School provides for learners across foundational, secondary, innovation, and global exposure stages.</p>
					</div>
				</div>
			</section>

			<section className="pb-20">
				<div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 lg:px-8">
					{programs.map((program, index) => {
						const Icon = program.icon;
						return (
							<motion.div key={program.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} viewport={{ once: true }} className="premium-card p-7">
								<div className="mb-5 flex items-center justify-between gap-4">
									<div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"><Icon /></div>
									<span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:bg-white/10 dark:text-slate-300">{program.tag}</span>
								</div>
								<h2 className="text-2xl font-black">{program.title}</h2>
								<p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">{program.text}</p>
							</motion.div>
						);
					})}
				</div>
			</section>

			<section className="bg-slate-950 py-16 text-white">
				<div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 lg:flex-row lg:items-center lg:px-8">
					<div>
						<div className="section-eyebrow border border-white/10 bg-white/5 text-brand-300">Admissions</div>
						<h2 className="mt-5 text-3xl font-black md:text-4xl">Ready to start the Fortis learning journey?</h2>
					</div>
					<Link to="/admissions" className="fortis-primary-button gap-2">Begin admission <ArrowRight className="h-4 w-4" /></Link>
				</div>
			</section>
		</div>
	);
};

export default ProgramsPage;
