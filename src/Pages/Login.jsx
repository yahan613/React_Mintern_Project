import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginTab from "@/Component/Login/LoginTab";
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
    <div className="bg-[var(--darker-tertiary)] w-screen h-auto flex flex-col items-center justify-center">
      <LoginTab />
    </div>
  );
};

export default Login;
