import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, Menu, Moon, ShieldCheck, Sparkles, Sun, X } from "lucide-react";
import Footer from "./Footer";
import Logo from "../assets/logo-spp.png";
import { SessionManager } from "../components/SessionManager";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const navLinks = [
	{ name: "Home", path: "/" },
	{ name: "About", path: "/about" },
	{ name: "Academics", path: "/academics" },
	{ name: "Admissions", path: "/admissions" },
	{ name: "Contact", path: "/contact" },
];

const PublicLayout = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [hidden, setHidden] = useState(false);
	const { theme, setTheme } = useTheme();
	const location = useLocation();

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		let lastScroll = 0;

		const handleScroll = () => {
			const currentScroll = window.scrollY;
			setHidden(currentScroll > lastScroll && currentScroll > 120);
			lastScroll = currentScroll;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<div className="fortis-page-shell flex min-h-screen flex-col">
			<SessionManager />

			<header
				className={cn(
					"fixed left-0 right-0 top-0 z-50 px-4 pt-4 transition-transform duration-500",
					hidden && "-translate-y-28"
				)}
			>
				<nav className="container mx-auto">
					<div className="glass flex h-16 items-center justify-between rounded-full px-4 shadow-glow md:h-[72px] md:px-5">
						<Link to="/" className="group flex items-center gap-3">
							<div className="logo-animation flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-brand-200/50 bg-white shadow-sm dark:border-white/10 dark:bg-white/10">
								<img src={Logo} alt="Fortis School Portal" className="h-9 w-9 object-contain" />
							</div>
							<div className="leading-tight">
								<p className="text-sm font-black uppercase tracking-[0.22em] text-slate-950 dark:text-white md:text-base">
									Fortis
								</p>
								<p className="hidden text-[11px] font-semibold text-slate-500 dark:text-slate-400 sm:block">
									School Portal
								</p>
							</div>
						</Link>

						<div className="hidden items-center rounded-full border border-slate-200/70 bg-white/70 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04] lg:flex">
							{navLinks.map((link) => (
								<NavLink
									key={link.path}
									to={link.path}
									className={({ isActive }) =>
										cn(
											"rounded-full px-4 py-2 text-sm font-bold transition-all duration-300",
											isActive
												? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
												: "text-slate-600 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
										)
									}
								>
									{link.name}
								</NavLink>
							))}
						</div>

						<div className="hidden items-center gap-2 md:flex">
							<button
								type="button"
								onClick={toggleTheme}
								className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-700 transition-all hover:border-brand-200 hover:text-brand-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
								aria-label="Toggle theme"
							>
								{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
							</button>
							<Link to="/login" className="fortis-secondary-button px-5 py-2.5">
								Sign in
							</Link>
							<Link to="/admissions" className="fortis-primary-button gap-2 px-5 py-2.5">
								Apply now <ArrowRight className="h-4 w-4" />
							</Link>
						</div>

						<button
							type="button"
							onClick={() => setIsMobileMenuOpen((value) => !value)}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white lg:hidden"
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>
					</div>

					{isMobileMenuOpen && (
						<div className="glass mt-3 rounded-3xl p-4 shadow-glow lg:hidden">
							<div className="mb-4 flex items-center gap-2 rounded-2xl border border-brand-200/60 bg-brand-50 p-3 text-brand-800 dark:border-white/10 dark:bg-white/5 dark:text-brand-300">
								<Sparkles className="h-4 w-4" />
								<p className="text-sm font-bold">Enterprise-grade school experience</p>
							</div>
							<div className="grid gap-2">
								{navLinks.map((link) => (
									<NavLink
										key={link.path}
										to={link.path}
										className={({ isActive }) =>
											cn(
												"rounded-2xl px-4 py-3 text-sm font-bold transition-colors",
												isActive
													? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
													: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
											)
										}
									>
										{link.name}
									</NavLink>
								))}
							</div>
							<div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
								<button onClick={toggleTheme} className="fortis-secondary-button justify-between">
									<span>Switch appearance</span>
									{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
								</button>
								<Link to="/login" className="fortis-primary-button gap-2">
									<ShieldCheck className="h-4 w-4" /> Portal Login
								</Link>
							</div>
						</div>
					)}
				</nav>
			</header>

			<main className="flex-1 pt-24 md:pt-28">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};

export default PublicLayout;
