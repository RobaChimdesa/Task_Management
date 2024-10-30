// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" text-black  font-bold py-8">
      <div className="max-w-screen-lg mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">TaskManager</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your tasks efficiently and stay organized.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 md:space-x-8 text-sm">
          <Link to="/" className="hover:text-blue-400 transition-colors">About</Link>
          <Link to="/" className="hover:text-blue-400 transition-colors">Features</Link>
          <Link to="/" className="hover:text-blue-400 transition-colors">Pricing</Link>
          <Link to="/" className="hover:text-blue-400 transition-colors">Contact</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} TaskManager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
