import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { handleGoogleLogin } from "@/firebase/auth";
import { login } from "@/redux/loginSlice";


const LoginTab = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com") {
      navigate("/member");
    } else {
      alert("Email or password is incorrect!");
    }
  };
  const handleLogin = async () => {
    let result = await handleGoogleLogin();
    if (result === false) return;
    const db = getFirestore();
    const userRef = doc(db, "users", result.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      dispatch(
        login({
          userId: result.uid,
          email: result.email,
          userName: userSnap.data().userName || "User",
          userChickenBaby: userSnap.data().userChickenBaby || "ChickenBaby",
        })
      );
      navigate("/member");
    } else {
      alert("尚未註冊！");
    }
  };

  return (
    <div className="w-auto h-auto flex flex-col items-center justify-center pt-10 mb-10">
      <img className="p-0 w-[90px] self-end" src="./img/Chickenteenager.png" alt="login" />
      <div className="w-full bg-white p-20 rounded-2xl shadow-xl p-8 bg-[var(--tertiary)] shadow-md text-start mb-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--secondary)]">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. test@example.com"
              className="w-full px-4 py-2 bg-[var(--base-200)] rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[var(--base-200)] rounded-lg shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[var(--accent)] hover:bg-[var(--warning)] text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            登入
          </button>
          <button
            onClick={handleLogin}
            type="button"
            className="w-full py-2 mt-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
          >
            使用GOOGLE帳號直接登入
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          還沒有帳號？{' '}
          <Link to="/signup" className="text-[var(--secondary)] hover:text-[var(--warning)] font-medium">
            註冊
          </Link>
        </p>
      </div>

    </div>


  );
};

export default LoginTab;


