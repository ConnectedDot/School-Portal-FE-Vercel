import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { LoginForm } from "./components/login-form";

export const LoginPage = () => {
	return (
		<div className="fortis-auth-shell relative flex min-h-svh items-center justify-center overflow-hidden p-4 md:p-8">
			<div className="mesh-blur left-[-8rem] top-[-8rem] h-80 w-80 bg-brand-600/25" />
			<div className="mesh-blur bottom-[-10rem] right-[-8rem] h-96 w-96 bg-blue-600/20" />
			<div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" />

			<Link
				to="/"
				className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/80 backdrop-blur transition hover:bg-white/10 hover:text-white md:left-8 md:top-8"
			>
				<ArrowLeft className="h-4 w-4" /> Back to website
			</Link>

			<div className="relative z-10 grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
				<section className="hidden lg:block">
					<div className="section-eyebrow border border-white/10 bg-white/5 text-brand-300">
						<Sparkles className="h-4 w-4" /> Fortis School Portal
					</div>
					<h1 className="mt-6 text-5xl font-black tracking-tight text-white xl:text-6xl">
						Manage school operations with a refined digital experience.
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
						A mature portal for administrators, faculty, guardians, and students — designed with the same business-class Fortis Nexarion standard.
					</p>
					<div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
						{[
							["4", "Role portals"],
							["360°", "Student view"],
							["Secure", "Access layer"],
						].map(([value, label]) => (
							<div key={label} className="dark-card p-5">
								<p className="text-2xl font-black text-white">{value}</p>
								<p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
							</div>
						))}
					</div>
					<div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200">
						<ShieldCheck className="h-5 w-5 text-brand-400" /> Enterprise-grade authentication area
					</div>
				</section>

				<div className="mx-auto w-full max-w-xl">
					<LoginForm />
				</div>
			</div>
		</div>
	);
};
