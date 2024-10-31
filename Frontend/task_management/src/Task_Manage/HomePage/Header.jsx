import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
function Header() {
  return (
    <div className=" text-black font-serif text-xl">
      <header className="max-w-screen-lg mx-auto flex justify-between items-center p-4 ">
        <div>
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-12 shadow-lg m-4 rounded-full"
          />
        </div>
        <nav className="flex items-center space-x-4 md:ml-16">
          <ul className="flex space-x-4 md:space-x-16">
            <li>
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-200 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-200 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          to="/signup"
          className="bg-slate-300  text-black text-xl px-1 md:px-4 py-1 md:py-2 rounded-full hover:bg-slate-600 hover:text-white transition-all"
        >
          Sign Up
        </Link>
      </header>
    </div>
  );
}

export default Header;
