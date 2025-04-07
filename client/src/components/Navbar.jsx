import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-[#222222] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl text-white font-bold ">
              Oul <span className="text-[#FF9A00]">Corporation</span>
            </Link>
          </div>

          {/* Nav Items - Center */}
          <div className="hidden md:flex space-x-8 text-white">
            <Link to="/" className="hover:text-[#FF9A00] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#FF9A00] transition-colors">About</Link>
            <Link to="/market" className="hover:text-[#FF9A00] transition-colors">Market</Link>
            <Link to="/contact" className="hover:text-[#FF9A00] transition-colors">Contact</Link>
          </div>

          {/* Auth Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4 text-white">
            <Link to="/auth/register" className="hover:text-[#FF9A00] transition-colors">Register</Link>
            <span className="text-sm">/</span>
            <Link to="/auth/signin" className="hover:text-[#FF9A00] transition-colors">Signin</Link>
          </div>

          {/* Hamburger - Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <Link to="/" className="block text-[#222222] hover:text-[#FF9A00]">Home</Link>
              <Link to="/about" className="block text-[#222222] hover:text-[#FF9A00]">About</Link>
              <Link to="/market" className="block text-[#222222] hover:text-[#FF9A00]">Market</Link>
              <Link to="/contact" className="block text-[#222222] hover:text-[#FF9A00]">Contact</Link>
              <hr />
              <Link to="/register" className="block text-[#222222] hover:text-[#FF9A00]">Register</Link>
              <Link to="/signin" className="block text-[#222222] hover:text-[#FF9A00]">Signin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
