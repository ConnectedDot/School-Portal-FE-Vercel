import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, GraduationCap, ShieldCheck, Sparkles, Play, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const stats = [
	{ label: "Students", value: "3000+" },
	{ label: "Success rate", value: "98%" },
	{ label: "Portal roles", value: "4" },
];

const HeroSection = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isPlaying, setIsPlaying] = useState(false);

	const handleMouseMove = (e: React.MouseEvent) => {
		const { clientX, clientY } = e;
		setMousePosition({ x: clientX, y: clientY });
	};

	return (
		<section 
			className="relative isolate overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20 dark:from-[#0a0a0a] dark:via-[#1a1a2e] dark:to-[#0f0f1a] py-20 md:py-32"
			onMouseMove={handleMouseMove}
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
				<div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
			</div>

			{/* Grid pattern overlay */}
			<div className="absolute inset-0 bg-grid-pattern opacity-30" />

			<div className="container relative z-10 mx-auto px-4 lg:px-8">
				<div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="min-w-0"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 border border-orange-200 dark:border-orange-800 mb-6">
							<Sparkles className="h-4 w-4 text-orange-600 dark:text-orange-400" />
							<span className="text-sm font-semibold text-orange-800 dark:text-orange-200">
								Admissions Open • 2025/2026 Session
							</span>
						</div>

						<h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-orange-600 to-slate-900 dark:from-white dark:via-orange-200 dark:to-white bg-clip-text text-transparent animate-gradient">
							Building Future Leaders Through
							<br />
							<span className="text-6xl md:text-8xl">Transformative Education</span>
						</h1>

						<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">
							A refined academic and digital school experience for administrators, teachers, guardians,
							and students — built with the same business-class Fortis Nexarion standard.
						</p>

						<div className="mt-8 flex flex-wrap gap-4">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link 
									to="/admissions" 
									className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-full shadow-lg shadow-orange-500/50 transition-all duration-300"
								>
									<span className="relative z-10">Apply Now</span>
									<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
									<div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
								</Link>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Link 
									to="/programs" 
									className="group inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-full border-2 border-slate-200 dark:border-slate-600 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 shadow-lg transition-all duration-300"
								>
									Explore Programs
									<ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Link>
							</motion.div>
						</div>

						<div className="mt-10 grid max-w-xl gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300 sm:grid-cols-3">
							{["Accredited Institution", "Modern Learning", "Secure Portal"].map((item, index) => (
								<motion.div
									key={item}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									className="flex items-center gap-2"
								>
									<CheckCircle2 className="h-4 w-4 text-green-600" />
									{item}
								</motion.div>
							))}
						</div>

						{/* Testimonial slider */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="mt-12 p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-slate-700"
						>
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0">
									<div className="flex text-yellow-400">
										{[...Array(5)].map((_, i) => (
											<Star key={i} className="h-5 w-5" fill="currentColor" />
										))}
									</div>
								</div>
								<div>
									<p className="text-slate-700 dark:text-slate-300 italic">
										"Fortis School has transformed how we manage our school. The digital tools are intuitive and the support is exceptional."
									</p>
									<p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
										— Dr. Adebayo Johnson, Principal
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, scale: 0.94 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative min-w-0"
					>
						<div className="glass-strong relative overflow-hidden rounded-[2rem] p-3 shadow-2xl shadow-orange-500/20">
							<motion.div
								className="relative h-[360px] w-full rounded-[1.5rem] md:h-[460px] overflow-hidden"
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}
							>
								<img
									src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop"
									alt="Students learning in a modern classroom"
									className="h-full w-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
							</motion.div>
							
							<div className="absolute inset-x-3 bottom-3 rounded-b-[1.5rem] bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 pt-24">
								<div className="grid grid-cols-3 gap-3">
									{stats.map((stat, index) => (
										<motion.div
											key={stat.label}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
											className="rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
										>
											<p className="text-2xl font-black text-orange-300">{stat.value}</p>
											<p className="text-[11px] font-semibold text-white/75">{stat.label}</p>
										</motion.div>
									))}
								</div>
							</div>

							{/* Play button overlay */}
							<motion.button
								className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group/border:opacity-0 group-hover:opacity-100"
								onClick={() => setIsPlaying(!isPlaying)}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30 group-hover:bg-white/30 transition-colors">
									<Play className="h-8 w-8 text-white ml-1" fill={isPlaying ? 'currentColor' : 'none'} />
								</div>
							</motion.button>

							<motion.div
								className="absolute -left-3 -top-5 rounded-3xl border border-white/20 bg-white/90 p-4 shadow-premium backdrop-blur-xl dark:bg-white/10"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								<div className="flex items-center gap-3">
									<div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white">
										<GraduationCap className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm font-black text-slate-950 dark:text-white">Smart learning</p>
										<p className="text-xs text-slate-500 dark:text-slate-300">Academic clarity</p>
									</div>
								</div>
							</motion.div>

							<motion.div
								className="absolute -bottom-5 -right-3 rounded-3xl border border-white/20 bg-slate-950 p-4 text-white shadow-glow"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<div className="flex items-center gap-3">
									<div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
										<ShieldCheck className="h-5 w-5" />
									</div>
									<div>
										<p className="text-sm font-black">Secure portal</p>
										<p className="text-xs text-white/60">Parents • Staff • Students</p>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 -translate-x-1/2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-2">
					<motion.div
												className="w-1.5 h-1.5 bg-slate-900 dark:bg-white rounded-full"
												animate={{ y: [0, 16, 0] }}
												transition={{ duration: 1.5, repeat: Infinity }}
											/>
										</div>
			</motion.div>
		</section>
	);
};

export default HeroSection;
