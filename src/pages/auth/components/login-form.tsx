import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Logo from "../../../assets/logo-spp.png";
import { UserRole } from "@/types";
import { AdnPaths, FcyPaths, GdnPaths, SdtPaths } from "@/router/paths";
import { useLogins } from "@/hooks/auth";
import { setUserItem } from "@/storage";
import { AuthContext, type userProps } from "@/contexts/AuthContext";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { authenticate, updateUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const { mutateAsync: submitLogin, isPending: loading, reset } = useLogins(
		"/auth/login",
		"Successfully Logged In",
		async (data) => {
			if (!data?.data?.token) {
				throw new Error("Login succeeded, but the server did not return an access token.");
			}

			await setUserItem("token", data.data.token);
			await authenticate(data.data.token);

			const userProfile = data.data.user;
			await setUserItem("user_data", userProfile);
			await updateUser(userProfile);

			const user = userProfile as userProps;
			switch (user?.role) {
				case UserRole.ADMIN:
					navigate(AdnPaths.DASH);
					break;
				case UserRole.FACULTY:
					navigate(FcyPaths.DASH);
					break;
				case UserRole.STUDENT:
					navigate(SdtPaths.DASH);
					break;
				case UserRole.GUARDIAN:
					navigate(GdnPaths.DASH);
					break;
				default:
					navigate("/");
			}
		}
	);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const submittedEmail = String(formData.get("email") || email).trim();
		const submittedPassword = String(formData.get("password") || password);

		if (!submittedEmail || !submittedPassword) {
			toast.error("Enter your email and password to continue.");
			return;
		}

		try {
			reset();
			await submitLogin({ email: submittedEmail, password: submittedPassword });
		} catch (err) {
			toast.error(
				err instanceof Error
					? `Login failed: ${err.message}`
					: "Login failed: An error occurred while logging in"
			);
		}
	};

	return (
		<div className={cn("flex flex-col gap-5", className)} {...props}>
			<Card className="overflow-hidden rounded-[2rem] border-white/10 bg-white/[0.06] p-0 text-white shadow-2xl backdrop-blur-2xl">
				<CardContent className="p-0">
					<form className="p-6 sm:p-8" onSubmit={handleSubmit} noValidate>
						<FieldGroup>
							<div className="flex justify-center">
								<button
									type="button"
									onClick={() => navigate("/")}
									className="logo-animation flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white shadow-glow"
								>
									<img src={Logo} alt="School Portal Logo" className="h-12 w-12 object-contain" />
								</button>
							</div>

							<div className="flex flex-col items-center gap-3 text-center">
								<div className="inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-brand-300">
									<ShieldCheck className="h-3.5 w-3.5" /> Secure access
								</div>
								<h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
									Welcome back
								</h1>
								<p className="max-w-sm text-balance text-sm leading-6 text-slate-300">
									Sign in to continue managing academics, people, communication, reports, and school operations.
								</p>
							</div>

							<Field>
								<FieldLabel htmlFor="email" className="text-slate-200">
									Email address
								</FieldLabel>
								<div className="relative">
									<Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="name@school.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
										className="h-12 rounded-2xl border-white/10 bg-white/10 pl-11 text-white placeholder:text-slate-500 focus-visible:ring-brand-500"
										required
									/>
								</div>
								<FieldDescription className="text-slate-400">
									Use the email assigned to your Fortis portal account.
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel htmlFor="password" className="text-slate-200">
									Password
								</FieldLabel>
								<div className="relative">
									<LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
									<Input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										autoComplete="current-password"
										className="h-12 rounded-2xl border-white/10 bg-white/10 pl-11 pr-12 text-white placeholder:text-slate-500 focus-visible:ring-brand-500"
										required
									/>
									<button
										type="button"
										className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition hover:text-white"
										onClick={() => setShowPassword((prev) => !prev)}
										aria-label={showPassword ? "Hide password" : "Show password"}
									>
										{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
									</button>
								</div>
								<FieldDescription className="text-slate-400">
									Keep your password private and avoid shared devices.
								</FieldDescription>
							</Field>

							<div className="flex items-center justify-between text-sm">
								<label className="flex items-center gap-2 text-slate-300">
									<input type="checkbox" className="rounded border-white/20 bg-white/10 accent-brand-600" />
									Remember me
								</label>
								<button type="button" className="font-bold text-brand-300 transition hover:text-brand-200">
									Forgot password?
								</button>
							</div>

							<Field>
								<Button
									type="submit"
									disabled={loading}
									className="h-12 w-full rounded-2xl bg-brand-600 font-black text-white shadow-lg shadow-brand-950/30 transition hover:bg-brand-500 disabled:cursor-not-allowed"
								>
									{loading ? <Spinner className="size-4 text-white" /> : "Sign in to portal"}
								</Button>
							</Field>

							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-transparent *:data-[slot=field-separator-content]:text-slate-400">
								Need help?
							</FieldSeparator>

							<div className="text-center text-xs text-slate-400">
								<p>Forgot your password? Contact your school administrator.</p>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
