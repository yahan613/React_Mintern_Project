import React from "react";
import MainIntro from "@/Component/Home/MainIntro";
import IntroTab from "@/Component/Home/IntroTab";
import Footer from "@/Component/Footer";

const Home = () => {
  return (
    <div
      className="bg-[var(--primary)] w-screen h-screen m-0 p-0 flex flex-col items-center overflow-x-hidden sm:pt-20"
    >
      <MainIntro />
      <IntroTab />
      <Footer />
    </div>
  );
};

export default Home;
