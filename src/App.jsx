import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState } from 'react'
import './App.css'
import Home from "./Pages/Home";
import Features from "./Pages/Features";
import Faq from "./Pages/Faq";

import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

import 'animate.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router
      className="w-screen">
      <div
        style={{ fontFamily: 'Montserrat, sans-serif' }}
        className="w-screen h-screen m-0 p-0 mt-0 flex flex-col justify-start overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
