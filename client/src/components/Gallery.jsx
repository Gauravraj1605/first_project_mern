"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Luxury Residential Complex",
    category: "Residential",
    image: "https://res.cloudinary.com/dvu5gqlxn/image/upload/v1744121483/pexels-binyaminmellish-106399_f4grvt.jpg",
    description:
      "A modern residential complex with premium amenities and sustainable design.",
  },
  {
    id: 2,
    title: "Corporate Headquarters",
    category: "Commercial",
    image: "https://res.cloudinary.com/dvu5gqlxn/image/upload/v1744121483/pexels-binyaminmellish-106399_f4grvt.jpg",
    description:
      "State-of-the-art corporate headquarters with innovative workspace solutions.",
  },
  {
    id: 3,
    title: "Shopping Mall Renovation",
    category: "Renovation",
    image: "https://res.cloudinary.com/dvu5gqlxn/image/upload/v1744121483/pexels-binyaminmellish-106399_f4grvt.jpg",
    description:
      "Complete renovation and modernization of an existing shopping mall.",
  },
  {
    id: 4,
    title: "Hospital Building",
    category: "Healthcare",
    image: "https://res.cloudinary.com/dvu5gqlxn/image/upload/v1744121483/pexels-binyaminmellish-106399_f4grvt.jpg",
    description:
      "Modern healthcare facility designed for patient comfort and operational efficiency.",
  },
  {
    id: 5,
    title: "Educational Campus",
    category: "Educational",
    image: "https://res.cloudinary.com/dvu5gqlxn/image/upload/v1744121483/pexels-binyaminmellish-106399_f4grvt.jpg",
    description:
      "Comprehensive educational campus with classrooms, laboratories, and recreational facilities.",
  },
  {
    id: 6,
    title: "Luxury Hotel",
    category: "Hospitality",
    image: "https://res.cloudinary.com/dvu5gqlxn/image/upload/v1744121483/pexels-binyaminmellish-106399_f4grvt.jpg",
    description:
      "Five-star hotel with premium amenities and stunning architectural design.",
  },
];

const categories = [
  "All",
  "Residential",
  "Commercial",
  "Renovation",
  "Healthcare",
  "Educational",
  "Hospitality",
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#222222] mb-6">
            Our Recent Projects
          </h2>
          <div className="w-20 h-1 bg-[#FF9A00] mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of completed projects showcasing our
            expertise and commitment to excellence in construction.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#FF9A00] text-[#222222] font-medium"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden shadow-lg bg-white"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform:
                      hoveredProject === project.id ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <div
                  className="absolute inset-0 bg-[#222222] transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center"
                  style={{
                    opacity: hoveredProject === project.id ? 0.85 : 0,
                    pointerEvents:
                      hoveredProject === project.id ? "auto" : "none",
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>
                  <motion.a
                    href={`/projects/${project.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center text-[#FF9A00] font-medium"
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </motion.a>
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-[#222222] bg-gray-200 rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-[#222222]">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-[#FF9A00] text-[#222222] font-bold rounded-md hover:bg-opacity-90 transition-all duration-300"
          >
            View All Projects
          </motion.a>
        </div> */}
      </div>
    </section>
  );
};

export default Gallery;