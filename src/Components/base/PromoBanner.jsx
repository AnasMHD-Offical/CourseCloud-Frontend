import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./CustomStyle.css"
export default function PromoBanner({slides}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
  }

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <section className="py-16 md:py-24 sm:px-16 md:px-18 lg:px-36 custom-h bg-gradient-to-r from-primary to-purple-600 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit"
              className="flex  flex-col-reverse lg:h-64 xl:h-80 lg:flex-row items-center rounded-3xl bg-white/10 backdrop-blur-md shadow-xl overflow-hidden"
            >
              <motion.div
                className="md:w-[50.8%] h-60 py-4 md:h-80 lg:h-72   lg:px-10   xl:px-10 xl:p-8  md:p-12 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.span
                  className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    delay: 0.5,
                  }}
                >
                  LIVE
                </motion.span>
                <motion.h2
                  className="text-4xl xl:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {slides[currentSlide].title}
                </motion.h2>
                <motion.p
                  className=" text-base xl:text-xl mb-6 text-purple-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-primary hover:bg-purple-100"
                  >
                    Enroll Now
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="w-[100%] lg:w-[49.2%] relative h-64 sm:h-96 lg:h-auto lg:pr-10 xl:pr-0 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.img
                  src={slides[currentSlide].image}
                  alt="Promo banner"
                  className="w-full h-full rounded-none lg:rounded-lg lg: xl:rounded-none object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}