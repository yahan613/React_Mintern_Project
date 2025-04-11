import { Link, useLocation } from "react-router-dom"; // 確保使用的是 react-router-dom

const Navbar = () => {
  const location = useLocation(); const navbarBgColor =
    location.pathname === "/faq"
      ? "bg-[var(--darker-tertiary)]"
      : location.pathname === "/product"
        ? "bg-[var(--secondary)]"
        : "bg-[var(--primary)]";
  const textColor = location.pathname === "/product" ? "text-[var(--tertiary)]" : "text-[var(--secondary)]";
  console.log(location.pathname); 
  return (
    <nav className={`navbar ${navbarBgColor} text-base-100 p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* 左側 Logo */}
        <Link to="/" className="text-xl font-bold text-[var(--secondary)] hover:text-MyColor-primary">
          LOGO
        </Link>

        {/* 中間的導航連結 */}
        <div className={`flex space-x-4 ml-auto mr-16 ${textColor}`}>
          <Link
            to="/"
            className="text-xl hover:text-2xl hover:scale-105 transition-transform duration-300"
          >
            HOME
          </Link>
          <Link
            to="/product"
            className="text-xl hover:text-2xl hover:scale-105 transition-transform duration-300">
            PRODUCT
          </Link>
          <Link
            to="/faq"
            className="text-xl hover:text-2xl hover:scale-105 transition-transform duration-300">
            FAQS
          </Link>
        </div>

        {/* 右側圖標 */}
        <div className="flex space-x-4 bg-primary rounded-full mr-4">
          <Link to="/cart" className={`hover:text-primary ${textColor} hover:scale-110 transition-transform duration-300`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="w-8 h-8 fill-current"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </Link>
          <Link to="/contact" className={`hover:text-primary ${textColor} hover:scale-110 transition-transform duration-300`}>
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
    </nav>
  );
};

export default Navbar;