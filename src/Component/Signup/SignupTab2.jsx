import { useState } from "react";
import { motion } from "framer-motion"; // 加這行！

const SignupTab2 = ({ onNext }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="w-auto h-auto flex flex-col items-center justify-center pt-10"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      <img
        className="p-0 w-[90px] mb-[-5px] self-start"
        src="./img/ChickenBaby.png"
        alt="login"
      />
      <div className="w-[50vw] max-w-md bg-white rounded-2xl shadow-xl p-8 text-start mb-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--secondary)]">
          Set up your account
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext(formData);
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[var(--base-200)] rounded-lg shadow-sm"
              placeholder="輸入你的 Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[var(--base-200)] rounded-lg shadow-sm"
              placeholder="輸入你的密碼"
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
    </motion.div>
  );
};

export default SignupTab2;
