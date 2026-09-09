import { Link } from "react-router-dom";
import {
	Mail,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Linkedin,
	Instagram,
	ArrowUpRight,
	Send,
	ExternalLink,
} from "lucide-react";

const Footer = () => {
	return (
		<footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300">
			{/* Background decorations */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
				<div className="absolute inset-0 bg-grid-pattern opacity-5" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Main Footer Content */}
				<div className="pt-16 pb-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
						{/* School Information */}
						<div className="lg:col-span-4">
							<div className="mb-6 group">
								<Link to="/" className="inline-block">
									<span className="font-bold text-2xl">
										<span className="text-brand-500">FORTIS</span>
										<span className="text-white">HIGH SCHOOL</span>
									</span>
								</Link>
							</div>
							<p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
								Inspiring excellence in academics, character, and leadership. Join
								our vibrant learning community for a brighter future.
							</p>

							{/* Contact Info Cards */}
							<div className="space-y-4">
								<div className="flex items-start group">
									  <div className="shrink-0 w-10 h-10 bg-brand-600/10 rounded-lg flex items-center justify-center group-hover:bg-brand-600/20 transition-colors">
										<MapPin className="h-5 w-5 text-brand-500" />
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-200 mb-1">
											School Address
										</p>
										<span className="text-sm text-gray-400 leading-relaxed">
											123 Academic Avenue,
											<br />Ikotun, Lagos State, Nigeria
										</span>
									</div>
								</div>

								<div className="flex items-start group">
									  <div className="shrink-0 w-10 h-10 bg-brand-600/10 rounded-lg flex items-center justify-center group-hover:bg-brand-600/20 transition-colors">
										<Phone className="h-5 w-5 text-brand-500" />
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-200 mb-1">
											Call Us
										</p>
										<div className="space-y-1">
											<a
												href="tel:+2347012345678"
												className="block text-sm text-gray-400 hover:text-brand-500 transition-colors"
											>
												+234 701 234 5678
											</a>
											<a
												href="tel:+2348098765432"
												className="block text-sm text-gray-400 hover:text-brand-500 transition-colors"
											>
												+234 809 876 5432
											</a>
										</div>
									</div>
								</div>

								<div className="flex items-start group">
									  <div className="shrink-0 w-10 h-10 bg-brand-600/10 rounded-lg flex items-center justify-center group-hover:bg-brand-600/20 transition-colors">
										<Mail className="h-5 w-5 text-brand-500" />
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-200 mb-1">
											Email Us
										</p>
										<a
											href="mailto:info@fortishighschool.edu.ng"
											className="text-sm text-gray-400 hover:text-brand-500 transition-colors"
										>
											info@fortishighschool.edu.ng
										</a>
									</div>
								</div>
							</div>
						</div>

						{/* Quick Links */}
						<div className="lg:col-span-2">
							<h3 className="text-lg font-bold mb-6 text-white relative inline-block">
								Quick Links
								<span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-brand-500 to-transparent"></span>
							</h3>
							<ul className="space-y-3">
								{[
									{ to: "/", label: "Home" },
									{ to: "/about", label: "About Us" },
									{ to: "/admissions", label: "Admissions" },
									{ to: "/academics", label: "Academics" },
									{ to: "/faculty", label: "Faculty" },
									{ to: "/contact", label: "Contact" },
								].map((link) => (
									<li key={link.to}>
										<Link
											to={link.to}
											className="group inline-flex items-center text-gray-400 hover:text-brand-500 transition-colors"
										>
											<ArrowUpRight className="h-0 w-0 opacity-0 group-hover:h-4 group-hover:w-4 group-hover:opacity-100 transition-all mr-0 group-hover:mr-2" />
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Student Resources */}
						<div className="lg:col-span-3">
							<h3 className="text-lg font-bold mb-6 text-white relative inline-block">
								Student Resources
								<span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-brand-500 to-transparent"></span>
							</h3>
							<ul className="space-y-3">
								{[
									{ to: "/library", label: "Library" },
									{ to: "/login", label: "Student Portal" },
									{ to: "/events", label: "Events & Calendar" },
									{ to: "/clubs", label: "Clubs & Activities" },
									{ to: "/guidance", label: "Guidance & Counseling" },
									{ to: "/alumni", label: "Alumni" },
								].map((link) => (
									<li key={link.to}>
										<Link
											to={link.to}
											className="group inline-flex items-center text-gray-400 hover:text-brand-500 transition-colors"
										>
											<ArrowUpRight className="h-0 w-0 opacity-0 group-hover:h-4 group-hover:w-4 group-hover:opacity-100 transition-all mr-0 group-hover:mr-2" />
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Newsletter */}
						<div className="lg:col-span-3">
							<h3 className="text-lg font-bold mb-6 text-white relative inline-block">
								Stay Informed
								<span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-brand-500 to-transparent"></span>
							</h3>
							<p className="text-gray-400 mb-6 leading-relaxed">
								Subscribe to our newsletter for school news, events, and important
								updates.
							</p>
							<form className="mb-8">
								<div className="relative">
									<input
										type="email"
										placeholder="Enter your email"
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
									/>
									<button
										type="submit"
										className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-600 to-brand-500 text-white p-2 rounded-md hover:shadow-lg hover:shadow-brand-600/50 transition-all duration-300 group"
										aria-label="Subscribe"
									>
										<Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
									</button>
								</div>
							</form>

							{/* Social Links */}
							<div>
								<p className="text-sm font-medium text-gray-200 mb-4">
									Connect With Us
								</p>
								<div className="flex space-x-3">
									{[
										{ icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
										{ icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
										{ icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
										{ icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
									].map((social) => (
										<a
											key={social.label}
											href={social.href}
											className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all duration-300 group`}
											aria-label={social.label}
										>
											<social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 py-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-gray-500 text-sm">
							&copy; {new Date().getFullYear()} Fortis High School. All rights
							reserved.
						</p>
						<div className="flex flex-wrap justify-center gap-6">
							{[
								{ to: "/privacy-policy", label: "Privacy Policy" },
								{ to: "/terms-of-service", label: "Terms of Service" },
								{ to: "/cookies-policy", label: "Cookies Policy" },
								{ to: "/student-handbook", label: "Student Handbook" },
							].map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className="text-gray-500 hover:text-brand-500 text-sm transition-colors inline-flex items-center group"
								>
									{link.label}
									<ExternalLink className="h-0 w-0 opacity-0 group-hover:h-3 group-hover:w-3 group-hover:opacity-100 ml-0 group-hover:ml-1 transition-all" />
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
