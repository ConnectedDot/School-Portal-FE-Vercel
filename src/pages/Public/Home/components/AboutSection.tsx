import { motion } from "framer-motion";
import { Check, Zap, Users, Shield, Award, ArrowRight, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const coreValues = [
	{
		icon: Award,
		title: "Excellence",
		description: "Striving for the highest standards in education and character development",
		color: "from-orange-500 to-amber-500",
	},
	{
		icon: Zap,
		title: "Innovation",
		description: "Embracing modern teaching methods and educational technology",
		color: "from-blue-500 to-cyan-500",
	},
	{
		icon: Users,
		title: "Service",
		description: "Commitment to serving our community and society",
		color: "from-purple-500 to-pink-500",
	},
	{
		icon: Shield,
		title: "Integrity",
		description: "Upholding honesty, transparency, and ethical conduct",
		color: "from-green-500 to-emerald-500",
	},
];

const announcements = [
	{
		title: "Admission Open!",
		description: "Applications now open for 2025/2026 Academic Session",
		link: "/admissions",
		cta: "Apply Now",
		badge: "New",
	},
	{
		title: "School Resumption",
		description: "New term begins January 8th, 2026",
		link: "#",
		cta: "Learn More",
		badge: "Important",
	},
];

const AboutSection = () => {
	return (
		<section className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-[#0a0a0a] dark:via-orange-950/10 dark:to-[#0a0a0a]">
			<div className="container mx-auto px-4 lg:px-8">
				<div className="grid lg:grid-cols-3 gap-12">
					{/* Main About Content */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="lg:col-span-2 space-y-8"
					>
						<div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
							>
								<h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
									About Our School
								</h2>
								<div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6" />
							</motion.div>
							<p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
								Our School is a growing, dynamic vision-driven institution, founded on excellence
								and committed to pioneering innovation in education. We operate with a compelling
								vision of raising a new generation of leaders through holistic human development
								and integrated learning curriculum.
							</p>
						</div>

						{/* Core Values */}
						<div className="pt-6">
							<h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Our Core Values</h3>
							<div className="grid md:grid-cols-2 gap-6">
								{coreValues.map((value, index) => (
									<motion.div
										key={value.title}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										whileHover={{ scale: 1.02, y: -4 }}
										className="group relative p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
									>
										<div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
										<div className="relative">
											<div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 shadow-lg`}>
												<value.icon className="w-7 h-7 text-white" />
											</div>
											<h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">{value.title}</h4>
											<p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{value.description}</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* Announcements Card */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="lg:col-span-1"
					>
						<div className="sticky top-8">
							<div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-slate-700 dark:border-slate-600">
								<div className="flex items-center gap-3 mb-8">
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
										<Megaphone className="w-6 h-6 text-white" />
									</div>
									<h3 className="text-2xl font-bold">Announcements</h3>
								</div>

								<div className="space-y-4">
									{announcements.map((announcement, index) => (
										<motion.div
											key={announcement.title}
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
											whileHover={{ scale: 1.02 }}
											className="group relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
										>
											<div className="flex items-start justify-between mb-2">
												<h4 className="font-bold text-lg">{announcement.title}</h4>
												<span className="px-2 py-1 text-xs font-bold rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
													{announcement.badge}
												</span>
											</div>
											<p className="text-sm text-slate-300 mb-3">{announcement.description}</p>
											<Link
												to={announcement.link}
												className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold hover:text-orange-300 transition-colors group-hover:translate-x-1"
											>
												{announcement.cta}
												<ArrowRight className="w-4 h-4" />
											</Link>
										</motion.div>
									))}
								</div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: 0.5 }}
									className="pt-6"
								>
									<Link
										to="/announcements"
										className="group relative inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/50"
									>
										<span className="relative z-10">View All Announcements</span>
										<ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
									</Link>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
