import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
            <p className="mt-4 text-lg text-gray-500">
              Learn more about our mission and values
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Our Mission',
                  description: 'To provide a seamless and secure authentication experience using modern web technologies.'
                },
                {
                  title: 'Technology Stack',
                  description: 'Built with MongoDB, Express.js, React, and Node.js (MERN) for optimal performance.'
                },
                {
                  title: 'Security First',
                  description: 'Your security is our priority. We implement the best practices in web security.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-4 text-gray-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;