import Header from "@/components/Commons/Header";
import Features from "@/components/Commons/LandingPage/Features";
import Footer from "@/components/Commons/LandingPage/Footer";
import Hero from "@/components/Commons/LandingPage/Hero";
import Journey from "@/components/Commons/LandingPage/Journey";
import Question from "@/components/Commons/LandingPage/Question";
import SuccessStories from "@/components/Commons/LandingPage/SuccessStories";
import Trusted from "@/components/Commons/LandingPage/Trusted";

function LandingPage() {
  return (
    <div className=" xs:w-[100vw]  overflow-x-hidden overflow-y-auto   ">
      <div className="   ">
        <Header />
        <Hero />
        <Features />
        <Trusted />
        <SuccessStories />
        <Journey />
        <Question />
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
