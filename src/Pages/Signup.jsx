import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupTab from "@/Component/Signup/SignupTab";
import Footer from "@/Component/Footer";
const Signup = () => { 
  return (
    <div className="bg-[var(--darker-tertiary)] w-screen h-auto flex flex-col items-center justify-center">
      <SignupTab />
      <Footer />
    </div>
  );
};

export default Signup;
