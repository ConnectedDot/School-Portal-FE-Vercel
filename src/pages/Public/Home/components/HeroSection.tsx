import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, GraduationCap, ShieldCheck, Sparkles, Play, ChevronRight } from "lucide-react";
import { useState } from "react";

const stats = [
	{ label: "Academic records", value: "Unified" },
	{ label: "Experience", value: "Connected" },
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
			className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.7),transparent_24rem),linear-gradient(135deg,#ffb27a_0%,#f97316_45%,#ef4444_100%)] px-3 py-10 md:px-6 md:py-16 dark:bg-[radial-gradient(circle_at_75%_15%,rgba(249,115,22,0.18),transparent_30rem),linear-gradient(135deg,#111217,#08090c)]"
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

			<div className="container relative z-10 mx-auto max-w-[1500px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0d10] px-6 py-14 text-white shadow-[0_35px_100px_rgba(63,18,7,0.35)] md:px-10 lg:px-16 lg:py-20">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_32%,rgba(249,115,22,0.2),transparent_30rem),radial-gradient(circle_at_60%_15%,rgba(45,212,191,0.08),transparent_24rem)]" />
				<div className="relative grid min-w-0 items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="min-w-0"
					>
						<div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
							<Sparkles className="h-4 w-4 text-orange-600 dark:text-orange-400" />
							<span className="text-sm font-semibold text-orange-100">
								A calmer, connected school experience
							</span>
						</div>

						<h1 className="mb-6 max-w-3xl text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
							Learn clearly. <span className="text-orange-400">Grow confidently.</span>
						</h1>

						<p className="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg">
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

						<div className="mt-10 grid max-w-xl gap-3 text-sm font-semibold text-white/65 sm:grid-cols-3">
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

						{/* Product value */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="mt-12 rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-md"
						>
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0 text-teal-300">
									<div className="flex text-yellow-400">
										<ShieldCheck className="h-5 w-5" />
									</div>
								</div>
								<div>
									<p className="text-sm leading-6 text-white/70">
										One connected environment for academics, attendance, communication, and role-based school operations.
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
						<div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-orange-950/40">
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
