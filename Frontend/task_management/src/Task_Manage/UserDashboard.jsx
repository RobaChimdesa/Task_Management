import React from "react"
import { Link } from "react-router-dom"

function Dashboard(){

    return(
        <div className=" text-black font-serif text-xl">
          <header className="max-w-screen-lg mx-auto flex justify-end md:justify-between items-center p-4 ">
        
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
          className="bg-slate-300  text-black md:text-xl text-sm px-4 md:px-4 py-0 md:py-2 rounded-full hover:bg-slate-600 hover:text-white transition-all"
        >
          Logout
        </Link>
      </header>
    </div>
    )

}

export default Dashboard