import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { app } from "@/firebase/config";
import { setData } from "@/redux/loginSlice";
import { getFirestore, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import loading from "../../json/lottie/Loading.json"; // 你的 Lottie JSON 動畫


const SignupTabPhoto = ({ onNext }) => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '' });
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const [step, setStep] = useState(1);
    const finLoading = () => {
        setStep(step + 1); // 切換到下一個 Tab
    };
    useEffect(() => {
        if (step === 2) {
            const timer = setTimeout(onNext, 5000);
            return () => clearTimeout(timer);
        }
    }, [step, onNext]);
    return (
        <motion.div
            className="w-auto h-auto flex flex-col items-center justify-center pt-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
        >
            {step === 1 && (
                <div className="w-auto h-auto flex flex-col items-center justify-center pt-10">
                    <img className="p-0 w-[90px] mb-[-5px] self-start" src="./img/ChickenBaby.png" alt="login" />
                    <div className="w-[50vw] max-w-md bg-white rounded-2xl shadow-xl p-8 text-start mb-10">
                        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--secondary)]">
                            Please Choose a Photo
                        </h1>

                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">上傳你的雞胸肉寶寶照片作為大頭貼吧~</div>
                            <label className="w-full flex items-center justify-center py-2 px-2 mt-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-200 cursor-pointer text-center">
                              <span className="w-full text-center">
                                {(formData.file && formData.file.name)}
                              </span>
                              <input
                                type="file"
                                accept=".png"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                }}
                                
                              />
                            </label>
                            <div className="text-center mt-4">or</div>
                            <button
                                type="button"
                                onClick={() => {
                                    // 這裡可以添加上傳圖片的邏輯
                                    console.log("Upload photo clicked");
                                }}
                                className="w-full py-2 mt-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-200 mb-4"
                            >
                                使用預設照片
                            </button>
                        </div>
                        <button
                            type="submit"
                            onClick={finLoading}
                            className="w-full py-2 bg-[var(--accent)] hover:bg-[var(--warning)] text-white font-semibold rounded-lg shadow-md transition duration-200 mt-4"
                        >
                            下一步
                        </button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="w-auto h-auto flex flex-col items-center justify-center pt-10">
                    <Lottie animationData={loading} loop={true} className="w-[400px] h-[400px]" />
                    <h1 className="text-2xl font-bold text-center text-[var(--secondary)]">
                        即將完成註冊...
                    </h1>
                </div>
            )}
        </motion.div >

    );
};

export default SignupTabPhoto;

