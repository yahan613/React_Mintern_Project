import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "123456") {
      navigate("/member");
    } else {
      alert("Email or password is incorrect!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">登入</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="block text-sm font-medium text-gray-700">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          />
        </label>
        <label className="block mb-2">
          <span className="block text-sm font-medium text-gray-700">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          />
        </label>
        <button
          type="submit"
          className="mt-4 w-full px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        >
          登入
        </button>
      </form>
      <p className="mt-4">
        <Link to="/register" className="text-blue-500 hover:text-blue-700">
          註冊
        </Link>
      </p>
    </div>
  );
};

export default Login;
