import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#222222] to-[#222222]/80"></div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">
                <span className="text-[#ff8c00]">Oul</span> Corporation
              </h2>
              <div className="w-16 h-1 bg-[#ff8c00] mt-2"></div>
            </div>
            <p className="text-gray-300 max-w-xs">
              Building excellence in construction with innovation, quality, and commitment to customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3, color: "#ff8c00" }}
                className="text-gray-300 hover:text-[#ff8c00] transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3, color: "#ff8c00" }}
                className="text-gray-300 hover:text-[#ff8c00] transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3, color: "#ff8c00" }}
                className="text-gray-300 hover:text-[#ff8c00] transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3, color: "#ff8c00" }}
                className="text-gray-300 hover:text-[#ff8c00] transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#ff8c00]">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Services</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Projects</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#ff8c00]">Our Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services/construction" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Construction</Link></li>
              <li><Link to="/services/renovation" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Renovation</Link></li>
              <li><Link to="/services/consulting" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Consulting</Link></li>
              <li><Link to="/services/architecture" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Architecture</Link></li>
              <li><Link to="/services/electrical" className="text-gray-300 hover:text-[#ff8c00] flex items-center"><span className="mr-2">›</span> Electrical</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#ff8c00]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-[#ff8c00] mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">123 Construction Avenue, Building District, Kolkata, West Bengal, India - 700001</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-[#ff8c00] mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-[#ff8c00] mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-300">info@bongbabaacademy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center text-[#ff8c00]">Subscribe to Our Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-800"
              />
              <button className="bg-[#ff8c00] text-[#222222] font-bold px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">© {year} Oul Corporation. All rights reserved.</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff8c00] opacity-10 rounded-tr-full"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff8c00] opacity-5 rounded-bl-full"></div>
    </footer>
  )
}

export default Footer
