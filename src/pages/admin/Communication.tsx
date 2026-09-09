import { Bell, MessageSquare, Send, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdnPaths } from "@/router/paths";
import { useGetMyNotifications } from "@/hooks/notifications";

const Communication = () => {
	const navigate = useNavigate();
	const { data } = useGetMyNotifications();
	const notifications = Array.isArray(data) ? data : [];

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<Badge className="rounded-full bg-brand-50 text-brand-700 hover:bg-brand-50 dark:bg-white/5 dark:text-brand-300">
						<MessageSquare className="mr-2 h-3.5 w-3.5" /> Communication
					</Badge>
					<h1 className="mt-3 text-3xl font-black">Communication Hub</h1>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
						Review message activity and jump into the notification sender backed by the deployed notification endpoints.
					</p>
				</div>
				<Button className="gap-2 rounded-full" onClick={() => navigate(AdnPaths.NOTIFICATIONS)}>
					<Send className="h-4 w-4" /> Compose Notification
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				{[
					{ label: "Notifications", value: notifications.length, icon: Bell },
					{ label: "Audience Modes", value: 3, icon: Users },
					{ label: "Channels", value: "In-app", icon: MessageSquare },
				].map((metric) => (
					<Card key={metric.label} className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
						<CardContent className="flex items-center justify-between p-5">
							<div>
								<p className="text-xs font-bold uppercase text-muted-foreground">{metric.label}</p>
								<p className="mt-3 text-3xl font-black">{metric.value}</p>
							</div>
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
								<metric.icon className="h-5 w-5" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="rounded-3xl border-slate-200/80 bg-white/90 shadow-premium dark:border-white/10 dark:bg-white/[0.04]">
				<CardHeader>
					<CardTitle>Recent Notification Stream</CardTitle>
					<CardDescription>Latest messages visible to the signed-in admin account.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					{notifications.slice(0, 8).map((item: any) => (
						<div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="font-bold">{item.title}</p>
									<p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
								</div>
								<Badge variant={item.isRead ? "outline" : "default"}>{item.type || "INFO"}</Badge>
							</div>
						</div>
					))}
					{notifications.length === 0 && <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">No notifications to display yet.</div>}
				</CardContent>
			</Card>
		</div>
	);
};

export default Communication;
