import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { frame, motion, useSpring } from "motion/react"
import { RefObject, useEffect, useRef } from "react"

import './App.css';
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Faq from "./Pages/Faq";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import MemberCenter from "./Pages/Member";
import Login from "./Pages/Login";
import Navbar from "./Component/Navbar";

import 'animate.css';
console.log('Redux 初始狀態:', store.getState());
function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
        onBeforeLift={() => {
          console.log(store.getState());
        }}
      >
        <Router>
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
              <Route path="/member" element={<MemberCenter />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
