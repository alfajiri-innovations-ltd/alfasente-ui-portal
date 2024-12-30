import Header from "@/components/Commons/Header";
import Hero from "@/components/Commons/LandingPage/Hero";
// import SuccessStories from "@/components/Commons/LandingPage/SuccessStories";
// import Trusted from "@/components/Commons/LandingPage/Trusted";

function LandingPage() {
  return (
    <div className=" min-h-screen ">
      <Header />

      <div className="px-[4vw] lg:px-[4vw]">
        <Hero />

        {/* <Trusted /> */}
        {/* <SuccessStories /> */}
        {/*

          <Features />
          <Journey />
         
          <Question isLoggedIn={isLoggedIn} /> */}
      </div>
    </div>
  );
}

export default LandingPage;
