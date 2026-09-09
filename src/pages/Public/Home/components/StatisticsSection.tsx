import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Award, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const statistics = [
	{
		value: "2015",
		label: "Establishment Year",
		icon: Sparkles,
		color: "from-orange-500 to-amber-500",
	},
	{
		value: "12+",
		label: "Departments",
		icon: BookOpen,
		color: "from-blue-500 to-cyan-500",
	},
	{
		value: "3000+",
		label: "Active Students",
		icon: Users,
		color: "from-purple-500 to-pink-500",
	},
];

const StatisticsSection = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#0a0a0a] dark:via-slate-900/50 dark:to-[#0a0a0a]">
			<div className="container mx-auto px-4 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left - Content */}
					<motion.div
						ref={ref}
						initial={{ opacity: 0, x: -40 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.8 }}
					>
						<h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">
							Our School at a{" "}
							<span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
								Glance
							</span>
						</h2>
						<div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6" />
						<p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
							Established with a vision for excellence, our school drives academic progress through
							transformative teaching, innovative programs, and a nurturing environment that contributes
							to student success and community development.
						</p>

						{/* Statistics */}
						<div className="grid grid-cols-3 gap-6 mb-8">
							{statistics.map((stat, index) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									whileHover={{ scale: 1.05, y: -4 }}
									className="group relative p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
								>
									<div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
									<div className="relative">
										<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 mx-auto`}>
											<stat.icon className="w-6 h-6 text-white" />
										</div>
										<div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
										<div className="text-xs text-slate-600 dark:text-slate-400 font-medium text-center">{stat.label}</div>
									</div>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<Link
								to="/about/history"
								className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-orange-500/50"
							>
								Our Illustrious History
								<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
							</Link>
						</motion.div>
					</motion.div>

					{/* Right - Image */}
					<motion.div
						ref={ref}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={isInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative"
					>
						<div className="relative">
							<motion.div
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className="relative rounded-3xl overflow-hidden shadow-2xl"
							>
								<img
									src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop"
									alt="School Campus"
									className="w-full h-[500px] object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
							</motion.div>

							{/* Floating Success Rate Card */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.6, delay: 0.4 }}
								whileHover={{ scale: 1.05, y: -4 }}
								className="absolute -bottom-6 -left-6 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-slate-700"
							>
								<div className="flex items-center gap-4">
									<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
										<TrendingUp className="w-7 h-7 text-white" />
									</div>
									<div>
										<div className="text-4xl font-black text-green-400">98%</div>
										<div className="text-sm text-slate-300 font-medium">Success Rate</div>
									</div>
								</div>
							</motion.div>

							{/* Floating Awards Card */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.6, delay: 0.5 }}
								whileHover={{ scale: 1.05, y: -4 }}
								className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700"
							>
								<div className="flex items-center gap-4">
									<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
										<Award className="w-7 h-7 text-white" />
									</div>
									<div>
										<div className="text-2xl font-black text-slate-900 dark:text-white">15+</div>
										<div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Awards Won</div>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default StatisticsSection;
