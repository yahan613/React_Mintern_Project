import { motion } from "framer-motion";

const SignupTab3 = () => {
  return (
    <motion.div
      className="w-9/10 sm:w-auto h-auto flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
    >
      <img
        className="p-0 w-[90px] mb-[-5px] self-start ml-10 sm:ml-5"
        src="./img/ChickenBaby.png"
        alt="success"
      />
      <div className="w-9/10 sm:w-[50vw] max-w-md rounded-2xl shadow-xl p-12 text-center mb-10 self-center bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-[var(--secondary)] text-center">
          Congraduations~
        </h1>
        <div className="text-lg text-gray-700 mb-4">
          歡迎加入我們的社群<br></br>
          一起養大你的肌胸肉寶寶吧！
        </div>
        <Link
          to="/login"
          className="inline-block px-6 py-2 bg-[var(--accent)] hover:bg-[var(--warning)] text-white font-semibold rounded-lg shadow-md transition duration-200"
        >
          go to login
        </Link>
      </div>
    </motion.div>
  );
};

export default SignupTab3;
