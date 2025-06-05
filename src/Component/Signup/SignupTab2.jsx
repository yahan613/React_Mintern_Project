import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { app } from "@/firebase/config";
import { setData } from "@/redux/loginSlice";
import { getFirestore, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";


const SignupTab2 = ({ onNext }) => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '' });
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        const db = getFirestore(app);
        dispatch(
            setData({
                userName: formData.firstName,
                userChickenBaby: formData.lastName,
            })
        );
        setDoc(doc(db, "users", login.userId), {
            userName: formData.firstName,
            userChickenBaby: formData.lastName,
        }, { merge: true });
    }


    return (
        <motion.div
            className="w-9/10 sm:w-auto h-auto flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
        >
            <div className="w-9/10 sm:w-auto h-auto flex flex-col items-center justify-center pt-10">
                <img className="p-0 w-[90px] mb-[-5px] self-start" src="./img/ChickenBaby.png" alt="login" />
                <div className="w-full sm:w-[50vw] max-w-md bg-white rounded-2xl shadow-xl p-8 text-start mb-10">
                    <h1 className="text-4xl font-bold mb-6 text-center text-[var(--secondary)]">
                        Hi there!
                    </h1>
                    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                你的名字
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[var(--base-200)] rounded-lg shadow-sm"
                                placeholder="你叫做什麼呢?"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                肌胸肉寶寶的名字
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-[var(--base-200)] rounded-lg shadow-sm"
                                placeholder="肌胸肉寶寶的名字叫做什麼呢?"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="w-full py-2 bg-[var(--accent)] hover:bg-[var(--warning)] text-white font-semibold rounded-lg shadow-md transition duration-200"
                        >
                            下一步
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>

    );
};

export default SignupTab2;

