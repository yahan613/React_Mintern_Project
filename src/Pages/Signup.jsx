import { useState } from "react";
import SignupTab1 from "@/Component/Signup/SignupTab2";
import SignupTab2 from "@/Component/Signup/SignupTab1";
import SignupTab3 from "@/Component/Signup/SignupTab3";
import Footer from "@/Component/Footer";

const Signup = () => {
  const [step, setStep] = useState(1); // 預設顯示第一個 Tab

  const handleNext = () => {
    setStep(step + 1); // 切換到下一個 Tab
  };

  return (
    <div className="bg-[var(--darker-tertiary)] w-screen h-screen flex flex-col items-center justify-center">
      {step === 1 && <SignupTab1 onNext={handleNext} />}
      {step === 2 && <SignupTab2 onNext={handleNext}/>}
      {step === 3 && <SignupTab3 />}
      
    </div>
  );
};

export default Signup;

