import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LessonsSection from "@/components/LessonsSection";
import SafetySection from "@/components/SafetySection";
import QuizSection from "@/components/QuizSection";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LessonsSection />
        <SafetySection />
        <QuizSection />
        <FeedbackSection />
      </main>
      <Footer />
    </>
  );
}
