const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Building secure and scalable web applications using the MERN stack.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">About</a>
              </li>
              <li>
                <a href="/signin" className="text-gray-400 hover:text-white">Sign In</a>
              </li>
              <li>
                <a href="/signup" className="text-gray-400 hover:text-white">Sign Up</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: info@example.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;