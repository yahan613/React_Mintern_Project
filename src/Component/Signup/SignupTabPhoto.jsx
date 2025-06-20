import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { app } from "@/firebase/config";
import { setData } from "@/redux/loginSlice";
import { getFirestore, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import loading from "../../json/lottie/Loading.json"; // 你的 Lottie JSON 動畫
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadAvatar } from "../../firebase/storage"; 


const SignupTabPhoto = ({ onNext }) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ file: null }); // ← 加這行

    const user = useSelector(
        (state) => state.login);

    const uploadPhotoAndSaveURL = async () => {
        await uploadAvatar(user.userMail, formData.file);
    };
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
            className="w-auto h-auto flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
        >
            {step === 1 && (
                <div className="w-9/10 sm:w-auto h-auto flex flex-col items-center justify-center">
                    <img className="p-0 w-[90px] mb-[-5px] self-start ml-10 sm:ml-5" src="./img/ChickenBaby.png" alt="login" />
                    <div className="w-9/10 sm:w-[50vw] max-w-md bg-white rounded-2xl shadow-xl p-8 text-start mb-10">
                        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--secondary)] break-normal">
                            Please choose a photo
                        </h1>

                        <div>
                            <div className="text-sm font-medium text-gray-700 mb-1 text-center sm:text-left">上傳你的肌胸肉寶寶照片作為大頭貼吧~</div>
                            <label className="w-full flex items-center justify-center py-2 mt-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-200 cursor-pointer text-center">
                                <span className="w-full text-center m-2">
                                </span>
                                <input
                                    className="text-sm overflow-hidden"
                                    type="file"
                                    accept=".png ,.jpg,.jpeg"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setFormData({ file }); // ← 這裡更新
                                    }}

                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            onClick={async () => {
                                await uploadPhotoAndSaveURL(); // ← 先上傳圖片與存 URL
                                finLoading();
                            }}
                            className="w-full py-2 bg-[var(--accent)] hover:bg-[var(--warning)] text-white font-semibold rounded-lg shadow-md transition duration-200 mt-4"
                        >
                            下一步
                        </button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="w-auto h-auto flex flex-col items-center justify-center">
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

