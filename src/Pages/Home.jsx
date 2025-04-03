import React from "react";
import MainIntro from "@/Component/MainIntro";
import IntroTab from "@/Component/IntroTab";
import Footer from "@/Component/Footer";

const Home = () => {
  return (
    <div
      className="bg-[var(--primary)] w-screen h-screen m-0 p-0 mt-0 flex flex-col items-center overflow-x-hidden pt-10"
    >
      <MainIntro />
      <IntroTab />
      <Footer />
      
    </div>
  );
};

export default Home;
