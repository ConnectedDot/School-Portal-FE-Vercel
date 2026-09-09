import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProgramsSection from "./components/ProgramsSection";
import StatisticsSection from "./components/StatisticsSection";
import NewsSection from "./components/NewsSection";
import FAQSection from "./components/FAQSection";

const HomePage = () => {
	return (
		<div className="min-h-screen overflow-x-hidden bg-white text-slate-950 dark:bg-[#050505] dark:text-white">
			<HeroSection />
			<AboutSection />
			<ProgramsSection />
			<StatisticsSection />
			<NewsSection />
			<FAQSection />
		</div>
	);
};

export default HomePage;
