import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

const contacts = [
	{ title: "Phone", value: "+234 000 000 0000", icon: Phone },
	{ title: "Email", value: "info@fortisschool.com", icon: Mail },
	{ title: "Location", value: "Lagos, Nigeria", icon: MapPin },
	{ title: "Office Hours", value: "Mon - Fri, 8:00am - 4:00pm", icon: Clock },
];

const ContactPage = () => {
	return (
		<div className="overflow-x-hidden bg-white text-slate-950 dark:bg-[#050505] dark:text-white">
			<section className="relative isolate py-16 md:py-24">
				<div className="absolute inset-0 bg-fortis-radial" />
				<div className="container relative z-10 mx-auto px-4 lg:px-8">
					<div className="mx-auto max-w-3xl text-center">
						<div className="section-eyebrow section-eyebrow-light mb-6">Contact Us</div>
						<h1 className="heading-display">Speak with Fortis School.</h1>
						<p className="mt-6 text-muted-premium">Reach the admissions team, school office, or portal support desk with a clear and professional enquiry.</p>
					</div>
				</div>
			</section>

			<section className="pb-20">
				<div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
					<div className="grid gap-4">
						{contacts.map((contact, index) => {
							const Icon = contact.icon;
							return (
								<motion.div key={contact.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} viewport={{ once: true }} className="premium-card flex gap-4 p-5">
									<div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"><Icon className="h-5 w-5" /></div>
									<div>
										<p className="font-black">{contact.title}</p>
										<p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{contact.value}</p>
									</div>
								</motion.div>
							);
						})}
					</div>

					<form className="premium-card p-6 md:p-8">
						<h2 className="text-2xl font-black">Send an enquiry</h2>
						<p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">This is ready for API wiring later. For now, it gives the public page a complete mature UX.</p>
						<div className="mt-6 grid gap-4 md:grid-cols-2">
							<input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-white/5" placeholder="Full name" />
							<input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-white/5" placeholder="Email address" />
							<input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-white/5" placeholder="Phone number" />
							<input className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-white/5" placeholder="Subject" />
							<textarea className="min-h-36 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-white/5 md:col-span-2" placeholder="Message" />
						</div>
						<button type="button" className="fortis-primary-button mt-6 gap-2"><Send className="h-4 w-4" /> Submit enquiry</button>
					</form>
				</div>
			</section>
		</div>
	);
};

export default ContactPage;
