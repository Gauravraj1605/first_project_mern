import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

// Sample construction quotes and images
const slides = [
  {
    id: 1,
    image: "/hero1.jpg",
    quote: "We don't build structures, we build dreams that stand the test of time.",
    author: "BongBaba Construction",
  },
  {
    id: 2,
    image: "/hero2.jpg",
    quote: "Quality means doing it right when no one is looking.",
    author: "Henry Ford",
  },
  {
    id: 3,
    image: "/hero3.jpg",
    quote: "We shape our buildings; thereafter, they shape us.",
    author: "Winston Churchill",
  },
  {
    id: 4,
    image: "/hero4.jpg",
    quote: "Great buildings, like great mountains, are the work of centuries.",
    author: "Victor Hugo",
  },
];

// Animation variants for different transition styles
const slideVariants = [
  // Fade
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.8 },
  },
  // Slide up
  {
    initial: { y: 300, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -300, opacity: 0 },
    transition: { duration: 0.8 },
  },
  // Slide from right
  {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
    transition: { duration: 0.8 },
  },
  // Scale
  {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
    transition: { duration: 0.8 },
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationVariant, setAnimationVariant] = useState(0);
  const intervalRef = useRef(null);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setAnimationVariant((prev) => (prev + 1) % slideVariants.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setAnimationVariant((prev) => (prev + 1) % slideVariants.length);
  };

  // Set up automatic scrolling
  useEffect(() => {
    // Start the interval
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    // Clean up the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset the interval when manually changing slides
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  };

  // Handle manual navigation
  const handlePrev = () => {
    prevSlide();
    resetInterval();
  };

  const handleNext = () => {
    nextSlide();
    resetInterval();
  };

  // Handle indicator click
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAnimationVariant((prev) => (prev + 1) % slideVariants.length);
    resetInterval();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          initial={slideVariants[animationVariant].initial}
          animate={slideVariants[animationVariant].animate}
          exit={slideVariants[animationVariant].exit}
          transition={slideVariants[animationVariant].transition}
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentIndex].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4">
        <motion.div
          key={`quote-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="block">Welcome to</span>
            <span className="block text-[#FF9A00] font-ba">Our BongBaba Academy</span>
          </h1>

          <blockquote className="mt-8 text-xl sm:text-2xl italic">"{slides[currentIndex].quote}"</blockquote>
          <p className="mt-4 text-[#FF9A00] font-medium">— {slides[currentIndex].author}</p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-10">
            <a
              href="/signup"
              className="px-8 py-3 bg-[#FF9A00] text-[#222222] font-bold hover:bg-opacity-90 transition-all duration-300 hover:bg-stone-500 "
            >
              Get Started
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-[#222222] bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronUp size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-[#222222] bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronDown size={24} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border-2 border-[#FF9A00] transition-all duration-300 ${currentIndex === index ? "bg-[#FF9A00]" : "bg-transparent"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
