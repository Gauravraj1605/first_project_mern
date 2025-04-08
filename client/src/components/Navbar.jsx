import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserStore } from "../context/useUserStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // For profile dropdown
  const { user, logout } = useUserStore(); // Get user info and logout function

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-[#222222] z-50">
      {/* Black overlay with 0.5 opacity */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl text-white font-bold ">
              Oul <span className="text-[#FF9A00]">Corporation</span>
            </Link>
          </div>

          {/* Nav Items - Center */}
          <div className="hidden md:flex space-x-8 text-white">
            <Link to="/" className="hover:text-[#FF9A00] transition-colors">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-[#FF9A00] transition-colors"
            >
              About
            </Link>
            <Link
              to="/market"
              className="hover:text-[#FF9A00] transition-colors"
            >
              Market
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#FF9A00] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Auth / Profile Button - Right */}
          <div className="hidden md:flex items-center space-x-4 text-white">
            {!user ? (
              <>
                <Link
                  to="/auth/register"
                  className="hover:text-[#FF9A00] transition-colors"
                >
                  Register
                </Link>
                <span className="text-sm">/</span>
                <Link
                  to="/auth/signin"
                  className="hover:text-[#FF9A00] transition-colors"
                >
                  Signin
                </Link>
              </>
            ) : (
              <div className="relative group">
  {/* Profile Icon with Name */}
  <div className="flex items-center space-x-2 hover:text-[#FF9A00] transition-colors cursor-pointer">
    <img
      src="/icons8.png"
      alt="Profile"
      className="w-8 h-8 rounded-full"
    />
    <span>{user.firstName}</span>
  </div>

  {/* Dropdown shown on hover */}
  <div className="absolute right-0 mt-2 w-40 bg-white text-[#222222] shadow-md rounded-md hidden group-hover:block z-50">
    <Link
      to="/profile"
      className="block py-2 px-4 hover:bg-[#FF9A00] hover:text-white transition-colors"
    >
      Profile
    </Link>
    <div
      onClick={logout}
      className="py-2 px-4 hover:bg-[#FF9A00] hover:text-white cursor-pointer transition-colors"
    >
      Logout
    </div>
  </div>
</div>

            )}
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
              <Link
                to="/"
                className="block text-[#222222] hover:text-[#FF9A00]"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-[#222222] hover:text-[#FF9A00]"
              >
                About
              </Link>
              <Link
                to="/market"
                className="block text-[#222222] hover:text-[#FF9A00]"
              >
                Market
              </Link>
              <Link
                to="/contact"
                className="block text-[#222222] hover:text-[#FF9A00]"
              >
                Contact
              </Link>
              <hr />
              {!user ? (
                <>
                  <Link
                    to="/auth/register"
                    className="block text-[#222222] hover:text-[#FF9A00]"
                  >
                    Register
                  </Link>
                  <Link
                    to="/auth/signin"
                    className="block text-[#222222] hover:text-[#FF9A00]"
                  >
                    Signin
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="block text-[#222222] hover:text-[#FF9A00]"
                  >
                    Profile
                  </Link>
                  <div
                    className="block text-[#222222] hover:text-[#FF9A00] cursor-pointer"
                    onClick={() => {
                      logout();
                      setIsOpen(false); // Close mobile menu after logout
                    }}
                  >
                    Logout
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
