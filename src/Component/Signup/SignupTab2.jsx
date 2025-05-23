import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const SignupTab2 = ({ onNext }) => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="w-auto h-auto flex flex-col items-center justify-center pt-10">
            <img className="p-0 w-[90px] mb-[-5px] self-start" src="./img/ChickenBaby.png" alt="login" />
            <div className="w-[50vw] max-w-md bg-white rounded-2xl shadow-xl p-8 text-start mb-10">
                <h1 className="text-4xl font-bold mb-6 text-center text-[var(--secondary)]">
                    Hi there!
                </h1>
                <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-[var(--base-200)] rounded-lg shadow-sm"
                            placeholder="輸入你的名字"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-[var(--base-200)] rounded-lg shadow-sm"
                            placeholder="輸入你的姓氏"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-[var(--accent)] hover:bg-[var(--warning)] text-white font-semibold rounded-lg shadow-md transition duration-200"
                    >
                        下一步
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupTab2;

