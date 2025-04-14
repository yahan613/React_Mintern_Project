import { Link, useLocation, NavLink } from "react-router-dom"; // 確保使用的是 react-router-dom
import { useState } from "react";

const Navbar = () => {
  {/* 痊癒變數*/ }
  const location = useLocation();

  {/* 顏色*/ }
  const navbarBgColor =
    location.pathname === "/faq"
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
    { to: "/", label: "Home" },
    { to: "/product", label: "Product" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <nav className={`navbar ${navbarBgColor} text-base-100 p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <button
          className="flex items-center mx-4 lg:hidden hover:border-0"
          onClick={toggleHambergerMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`w-8 h-8 fill-current ${textColor}`}
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        {isHambergerMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-30 z-40 transition-opacity duration-300 ease-in-out"
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
          <img src="./img/ChickenBaby.png" alt="Logo" className="w-12 h-12 mr-2" />
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
              className="w-8 h-8 fill-current"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </Link>
          <Link to="/contact" className={`hover:text-primary ${textColor} hover:text-[var(--warning)] transition-transform duration-300`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-8 h-8 fill-current"
            >
              <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;