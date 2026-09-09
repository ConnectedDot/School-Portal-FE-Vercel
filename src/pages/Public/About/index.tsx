import { motion } from "framer-motion";
import { Award, BookOpenCheck, GraduationCap, HeartHandshake, ShieldCheck, Sparkles, UsersRound } from "lucide-react";

const values = [
	{ title: "Excellence", text: "A culture of high standards across academics, conduct, communication, and school operations.", icon: Award },
	{ title: "Innovation", text: "Modern teaching practices and digital systems that make learning and administration easier.", icon: Sparkles },
	{ title: "Integrity", text: "Transparent school processes, responsible record keeping, and dependable guardian communication.", icon: ShieldCheck },
	{ title: "Service", text: "A people-first school community that supports learners, parents, staff, and leadership.", icon: HeartHandshake },
];

const milestones = ["Founded with a vision for holistic education", "Expanded into digital academic operations", "Built parent, staff, student, and admin workflows", "Positioned for modern school growth and reporting"];

const AboutPage = () => {
	return (
		<div className="overflow-x-hidden bg-white text-slate-950 dark:bg-[#050505] dark:text-white">
			<section className="relative isolate overflow-hidden py-16 md:py-24">
				<div className="absolute inset-0 bg-grid-pattern opacity-50" />
				<div className="mesh-blur left-0 top-10 h-96 w-96 bg-brand-500/20" />
				<div className="container relative z-10 mx-auto px-4 lg:px-8">
					<div className="mx-auto max-w-4xl text-center">
						<div className="section-eyebrow section-eyebrow-light mb-6">About Fortis School</div>
						<h1 className="heading-display">A mature academic institution built for modern learning.</h1>
						<p className="mx-auto mt-6 max-w-3xl text-muted-premium">
							Fortis School combines character formation, academic discipline, and digital operations into one refined experience for learners, parents, staff, and administrators.
						</p>
					</div>
				</div>
			</section>

			<section className="py-10 md:py-16">
				<div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
					<motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-8">
						<div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white"><GraduationCap /></div>
						<h2 className="text-3xl font-black">Our mission</h2>
						<p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
							To raise confident, competent, and responsible learners through excellent teaching, accountable leadership, and a school environment where every stakeholder has clarity.
						</p>
					</motion.div>

					<div className="grid gap-5 sm:grid-cols-2">
						{values.map((value, index) => {
							const Icon = value.icon;
							return (
								<motion.div key={value.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} viewport={{ once: true }} className="premium-card p-6">
									<div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"><Icon className="h-5 w-5" /></div>
									<h3 className="text-lg font-black">{value.title}</h3>
									<p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{value.text}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			<section className="bg-slate-50 py-16 dark:bg-white/[0.03]">
				<div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:px-8">
					<div>
						<div className="section-eyebrow section-eyebrow-light mb-5">Our Journey</div>
						<h2 className="heading-section">A school structure designed to scale with excellence.</h2>
					</div>
					<div className="space-y-4">
						{milestones.map((item, index) => (
							<div key={item} className="glass-strong flex gap-4 rounded-3xl p-5">
								<div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-600 text-sm font-black text-white">{index + 1}</div>
								<p className="font-semibold leading-7 text-slate-700 dark:text-slate-200">{item}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;
