"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, StarHalf } from "lucide-react"

// Services data
const services = [
  {
    title: "CONSTRUCTION",
    description:
      "Professional construction services for residential and commercial projects with quality craftsmanship.",
    icon: "🏗️",
  },
  {
    title: "RENOVATION",
    description: "Transform your existing space with our expert renovation and remodeling services.",
    icon: "🔨",
  },
  {
    title: "CONSULTING",
    description: "Expert advice and planning for your construction projects from experienced professionals.",
    icon: "📋",
  },
  {
    title: "CONSTRUCT",
    description: "End-to-end construction management services ensuring timely and quality delivery.",
    icon: "🏢",
  },
  {
    title: "ARCHITECTURE",
    description: "Creative and functional architectural designs tailored to your specific requirements.",
    icon: "📐",
  },
  {
    title: "ELECTRICAL",
    description: "Complete electrical solutions for new constructions and renovations with safety standards.",
    icon: "⚡",
  },
]

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Property Developer",
    rating: 5,
    review:
      "BongBaba Academy has exceeded our expectations in every project. Their attention to detail and commitment to quality is unmatched in the industry.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Homeowner",
    rating: 4.5,
    review:
      "We hired BongBaba for our home renovation and couldn't be happier with the results. Professional team, timely delivery, and excellent craftsmanship.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "Commercial Client",
    rating: 5,
    review:
      "Working with BongBaba on our office complex was a seamless experience. Their expertise in commercial construction is truly remarkable.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Sunita Verma",
    position: "Interior Designer",
    rating: 4.5,
    review:
      "As an interior designer, I've collaborated with many construction companies, but BongBaba stands out for their precision and collaborative approach.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-[#FF9A00] text-[#FF9A00]" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-[#FF9A00] text-[#FF9A00]" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  )
}

// Service Card Component
const ServiceCard = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[#222222] mb-3">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </motion.div>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ name, position, rating, review, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-4 my-2 flex flex-col min-w-[300px] max-w-[350px]">
      <div className="flex items-center mb-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-bold text-[#222222]">{name}</h4>
          <p className="text-gray-600 text-sm">{position}</p>
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="text-gray-700 italic">"{review}"</p>
    </div>
  )
}

export default function About() {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const testimonialRef = useRef(null)

  // Parallax effect refs
  const containerRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)

  // Parallax effect for about section
  const { scrollYProgress: aboutScrollY } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  })

  const aboutY = useTransform(aboutScrollY, [0, 1], [0, -100])
  const aboutOpacity = useTransform(aboutScrollY, [0, 0.5, 1], [0, 1, 0])

  // Parallax effect for services section
  const { scrollYProgress: servicesScrollY } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  })

  const servicesY = useTransform(servicesScrollY, [0, 1], [100, -100])
  const servicesOpacity = useTransform(servicesScrollY, [0, 0.5, 1], [0, 1, 0])

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Scroll to active testimonial
  useEffect(() => {
    if (testimonialRef.current) {
      const scrollAmount = activeTestimonialIndex * 350 // Approximate width of a testimonial card
      testimonialRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [activeTestimonialIndex])

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* About Section with Parallax */}
      <section
        ref={aboutRef}
        className="relative py-20 md:py-32 bg-gradient-to-b from-[#222222] to-[#333333] text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
          ></div>
        </div>

        <motion.div
          style={{ y: aboutY, opacity: aboutOpacity }}
          className="relative z-10 container mx-auto px-4 md:px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-[#FF9A00]">BongBaba Academy</span>
            </h2>
            <div className="w-20 h-1 bg-[#FF9A00] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              BongBaba Academy is a premier construction and development company with over 15 years of experience in
              delivering exceptional projects across India. Our team of skilled professionals is dedicated to turning
              your vision into reality with precision, quality, and innovation.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              We pride ourselves on our commitment to excellence, sustainable practices, and client satisfaction. From
              residential buildings to commercial complexes, our portfolio showcases our versatility and expertise in
              the construction industry.
            </p>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute left-10 top-20 w-20 h-20 border-2 border-[#FF9A00] opacity-20 rounded-full"></div>
        <div className="absolute right-10 bottom-20 w-32 h-32 border-2 border-[#FF9A00] opacity-20"></div>
      </section>

      {/* What We Offer Section with Parallax */}
      <section ref={servicesRef} className="relative py-20 md:py-32 bg-gray-100 overflow-hidden">
        <motion.div style={{ y: servicesY, opacity: servicesOpacity }} className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#222222] mb-6">WHAT WE OFFER</h2>
            <div className="w-20 h-1 bg-[#FF9A00] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet iaculis elit. Nam semper ut
              arcu non placerat. Praesent nibh massa varius.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute left-0 top-0 w-40 h-40 bg-[#FF9A00] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-0 w-60 h-60 bg-[#FF9A00] opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#222222] mb-6">TESTIMONIALS</h2>
            <div className="w-20 h-1 bg-[#FF9A00] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What our clients say about our services and commitment to excellence.
            </p>
          </div>

          <div className="relative">
            {/* Testimonial Carousel */}
            <div
              ref={testimonialRef}
              className="flex overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="snap-center">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonialIndex === index ? "bg-[#FF9A00]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
