import { Link, useLocation, NavLink } from "react-router-dom"; // 確保使用的是 react-router-dom
import { useState } from "react";

const Navbar = () => {
  {/* 全域變數*/ }
  const location = useLocation();

  {/* 顏色*/ }
  const navbarBgColor =
    location.pathname === "/faq" || location.pathname === "/login" || location.pathname === "/signup"
      ? "bg-[var(--darker-tertiary)]"
      : location.pathname === "/product" || location.pathname === "/cart"
        ? "bg-[var(--secondary)]"
        : "bg-[var(--primary)]";
  const textColor =
    location.pathname === "/product" || location.pathname === "/cart"
      ? "text-[var(--tertiary)]"
      : location.pathname === "/faq"
        ? "text-[var(--secondary)]"
        : "text-[var(--secondary)]";

  {/* 漢堡選單*/ }
  const [isHambergerMenuOpen, setIsHambergerMenuOpen] = useState(false);
  const toggleHambergerMenu = () => setIsHambergerMenuOpen(!isHambergerMenuOpen);

  const navBarContent = [
    { to: "/", label: "HOME" },
    { to: "/product", label: "PRODUCT" },
    { to: "/faq", label: "FAQ" },
    { to: "/member", label: "Member" },
  ];

  return (
    <nav className={`navbar ${navbarBgColor} text-base-100 p-4 fixed top-0 left-0 right-0 z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        <button
          className="flex items-center mx-4 lg:hidden hover:border-0"
          onClick={toggleHambergerMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`w-6 sm:w-8 h-6 sm:h-8 fill-current ${textColor}`}
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        {isHambergerMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-30 z-40 transition-opacity duration-200 ease-in-out"
              onClick={toggleHambergerMenu}
            />

            <div
              className={`fixed inset-0 z-50 ${navbarBgColor} flex flex-col items-center justify-center space-y-6 w-3/4 h-full transition-transform duration-30 ease-in-out animate__animated animate__fadeInLeftBig`}
              onClick={toggleHambergerMenu}
            >
              {navBarContent.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={
                    `block text-white text-base transition-all duration-500 ease-in-out hover:opacity-100 hover:[text-shadow:0px_0px_30px_white]`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </>

        )}

        {/* 左側 Logo */}
        <Link to="/" className={`flex items-center text-xl font-bold ${textColor} hover:scale-105 transition-transform duration-300`}>
          <img src="./img/ChickenBaby.png" alt="Logo" className="w-12 h-12 mr-2 hidden sm:flex" />
          <span className="text-[var(--warning)]">COUNTBUDDY</span>
        </Link>

        {/* 中間的導航連結 */}
        <div className={`hidden lg:flex space-x-4 ml-auto mr-16 ${textColor}`}>
          <Link
            to="/"
            className="text-xl hover:text-[var(--warning)] transition-transform duration-500"
          >
            HOME
          </Link>
          <Link
            to="/product"
            className="text-xl hover:text-[var(--warning)] transition-transform duration-300">
            PRODUCT
          </Link>
          <Link
            to="/faq"
            className="text-xl hover:text-[var(--warning)] transition-transform duration-300">
            FAQS
          </Link>
        </div>

        {/* 右側圖標 */}
        <div className="flex space-x-4 bg-primary rounded-full mr-4">
          <Link to="/cart" className={`hover:text-primary ${textColor} hover:text-[var(--warning)] transition-transform duration-500`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="w-6 sm:w-8 h-6 sm:h-8 fill-current"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </Link>
          <Link to="/member" className={`hover:text-primary ${textColor} hover:text-[var(--warning)] transition-transform duration-300`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-6 sm:w-8 h-6 sm:h-8 fill-current">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;