import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { useState } from 'react'
import './App.css'
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Faq from "./Pages/Faq";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";

import Navbar from "./Component/Navbar";
import store from "./redux/store";

import 'animate.css';


function App() {
  return (
    <Provider store={store}>
      <Router
        className="w-screen">
        <div
          style={{ fontFamily: 'Montserrat, sans-serif' }}
          className="w-screen h-screen m-0 p-0 mt-0 flex flex-col justify-start overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
