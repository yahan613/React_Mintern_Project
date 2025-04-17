import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

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

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
