import { Outlet } from "react-router-dom";
import { SessionManager } from "../components/SessionManager";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "./components/app-sidebar";

export const MainLayout = () => {
	return (
		<SidebarProvider>
			<SessionManager />
			<div className="fortis-dashboard-shell flex min-h-screen w-full">
				<AppSidebar />
				<SidebarInset className="min-w-0 bg-transparent">
					<Header />
					<main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-5 sm:px-6 lg:px-8">
						<div className="animate-fade-in-up">
							<Outlet />
						</div>
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
};
