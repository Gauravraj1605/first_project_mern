"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"
import { useUserStore } from "../context/useUserStore"
import toast from "react-hot-toast"

// Construction quotes for the carousel
const quotes = [
  {
    text: "निर्माण से ही विकास का मार्ग प्रशस्त होता है।",
    translation: "Construction paves the way for development.",
    author: "- Indian Construction Philosophy",
  },
  {
    text: "एक ईंट से महल बनता है, एक कदम से सफर शुरू होता है।",
    translation: "A palace starts with a single brick, a journey with a single step.",
    author: "- Traditional Indian Wisdom",
  },
  {
    text: "समय की कसौटी पर खरी उतरती है अच्छी इमारत।",
    translation: "A good building stands the test of time.",
    author: "- Indian Architectural Saying",
  },
]

// Background images for carousel
const images = [
  "https://res.cloudinary.com/dvu5gqlxn/image/upload/v1744070686/samples/coffee.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
]

const Login = () => {
    const navigate = useNavigate();
    const { login, loading:loginLoading } = useUserStore();
    
  // Form state
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
    rememberMe: false,
  })

  // UI state
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [loginMethod, setLoginMethod] = useState("email") // "email" or "mobile"

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Toggle between email and mobile login
  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === "email" ? "mobile" : "email")
    setFormData({
      ...formData,
      emailOrMobile: "",
    })
    setErrors({})
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Email/Mobile validation
    if (!formData.emailOrMobile.trim()) {
      newErrors.emailOrMobile = loginMethod === "email" ? "Email is required" : "Mobile number is required"
    } else if (loginMethod === "email" && !/\S+@\S+\.\S+/.test(formData.emailOrMobile)) {
      newErrors.emailOrMobile = "Email is invalid"
    } else if (loginMethod === "mobile" && !/^\d{10}$/.test(formData.emailOrMobile)) {
      newErrors.emailOrMobile = "Mobile number must be 10 digits"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Prepare login data based on login method
      const loginData = {
        password: formData.password,
        rememberMe: formData.rememberMe,
      }

      if (loginMethod === "email") {
        loginData.emailOrMobile = formData.emailOrMobile
      } else {
        loginData.emailOrMobile = formData.emailOrMobile
      }

      // Replace with your actual API endpoint
      const response = login(loginData);
      navigate("/")

    } catch (error) {
      // Handle login error
      console.error("Login error:", error.response?.data || error.message)

      // Set error message from backend if available
      if (error.response?.data?.message) {
        setErrors({
          general: error.response.data.message,
        })
      } else {
        setErrors({
          general: "Login failed. Please check your credentials and try again.",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Auto-scroll quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image carousel with quotes */}
      <div className="w-full md:w-1/2 bg-[#222222] relative overflow-hidden">
        {/* Background image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentQuoteIndex]})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </motion.div>
        </AnimatePresence>

        {/* Quote content */}
        <div className="relative h-full flex flex-col justify-center items-center text-white p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`quote-${currentQuoteIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-md"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FF9A00]">Oul corporation</h2>
              <p className="text-xl md:text-2xl font-medium mb-4">{quotes[currentQuoteIndex].text}</p>
              <p className="text-sm md:text-base mb-4 italic">{quotes[currentQuoteIndex].translation}</p>
              <p className="text-sm text-[#FF9A00]">{quotes[currentQuoteIndex].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#222222]">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to continue to BongBaba Academy</p>
          </div>

          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
            >
              {errors.general}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login method toggle */}
            <div className="flex rounded-md shadow-sm p-1 bg-gray-100 mb-4">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  loginMethod === "email" ? "bg-white text-[#222222] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("mobile")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  loginMethod === "mobile" ? "bg-white text-[#222222] shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Mobile
              </button>
            </div>

            {/* Email or Mobile input */}
            <div>
              <label htmlFor="emailOrMobile" className="block text-sm font-medium text-gray-700 mb-1">
                {loginMethod === "email" ? "Email Address" : "Mobile Number"}
              </label>
              <input
                type={loginMethod === "email" ? "email" : "tel"}
                id="emailOrMobile"
                name="emailOrMobile"
                value={formData.emailOrMobile}
                onChange={handleChange}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.emailOrMobile ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#FF9A00]"
                }`}
                placeholder={loginMethod === "email" ? "you@example.com" : "9876543210"}
              />
              {errors.emailOrMobile && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                  {errors.emailOrMobile}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-[#FF9A00] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#FF9A00]"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1">
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-[#FF9A00] focus:ring-[#FF9A00] border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#222222] bg-[#FF9A00] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9A00] disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#222222]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9A00]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                ></path>
              </svg>
              Google
            </motion.button>
            <motion.button
              type="button"
              className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9A00]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                ></path>
              </svg>
              Facebook
            </motion.button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/auth/register" className="font-medium text-[#FF9A00] hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
