import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, MessageCircle, UserPlus } from "lucide-react";

const steps = [
	{ title: "Submit enquiry", text: "Share parent/guardian details and the preferred class or program.", icon: MessageCircle },
	{ title: "Document review", text: "Our admissions team reviews required academic and identity documents.", icon: FileText },
	{ title: "Assessment", text: "Learners complete placement interaction or class-level assessment where required.", icon: ClipboardCheck },
	{ title: "Enrollment", text: "Successful applicants receive onboarding and school portal access.", icon: UserPlus },
];

const requirements = ["Completed admission form", "Previous academic records", "Birth certificate or valid ID", "Parent/guardian contact details", "Passport photograph", "Medical or special learning notes where applicable"];

const AdmissionsPage = () => {
	return (
		<div className="overflow-x-hidden bg-white text-slate-950 dark:bg-[#050505] dark:text-white">
			<section className="relative isolate overflow-hidden py-16 md:py-24">
				<div className="absolute inset-0 bg-grid-pattern opacity-50" />
				<div className="mesh-blur right-0 top-0 h-96 w-96 bg-brand-500/20" />
				<div className="container relative z-10 mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8">
					<div>
						<div className="section-eyebrow section-eyebrow-light mb-6">Admissions</div>
						<h1 className="heading-display">A smooth, transparent admission process for every family.</h1>
						<p className="mt-6 text-muted-premium">From first enquiry to final enrollment, the process is designed to be clear, responsive, and parent-friendly.</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<a href="mailto:admissions@fortisschool.com" className="fortis-primary-button gap-2">Contact admissions <ArrowRight className="h-4 w-4" /></a>
							<Link to="/contact" className="fortis-secondary-button">Visit contact page</Link>
						</div>
					</div>
					<div className="glass-strong rounded-[2rem] p-7">
						<h2 className="text-2xl font-black">2025/2026 Session</h2>
						<p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">Applications are open for primary, secondary, and selected academic programs.</p>
						<div className="mt-6 rounded-3xl bg-brand-600 p-5 text-white">
							<p className="text-sm font-bold uppercase tracking-widest text-white/70">Status</p>
							<p className="mt-1 text-2xl font-black">Admissions Open</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-12 md:py-16">
				<div className="container mx-auto px-4 lg:px-8">
					<div className="mb-10 max-w-2xl">
						<h2 className="heading-section">How admission works</h2>
						<p className="mt-4 text-muted-premium">A simple workflow that reduces confusion and keeps parents informed.</p>
					</div>
					<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
						{steps.map((step, index) => {
							const Icon = step.icon;
							return (
								<motion.div key={step.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} viewport={{ once: true }} className="premium-card p-6">
									<div className="mb-5 flex items-center justify-between">
										<div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"><Icon className="h-5 w-5" /></div>
										<span className="text-sm font-black text-brand-600">0{index + 1}</span>
									</div>
									<h3 className="text-lg font-black">{step.title}</h3>
									<p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.text}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			<section className="bg-slate-50 py-16 dark:bg-white/[0.03]">
				<div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2 lg:px-8">
					<div>
						<div className="section-eyebrow section-eyebrow-light mb-5">Requirements</div>
						<h2 className="heading-section">Documents to prepare</h2>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						{requirements.map((item) => (
							<div key={item} className="glass-strong flex items-center gap-3 rounded-2xl p-4">
								<CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
								<p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AdmissionsPage;
