import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
function Testimonials({ testimonials }) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            What Our Students Say
          </h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
              >
                <p className="text-lg mb-4 italic">
                  &ldquo;{testimonials[activeSlide].content}&rdquo;
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonials[activeSlide].avatar}
                    alt={testimonials[activeSlide].name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">
                      {testimonials[activeSlide].name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {testimonials[activeSlide].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={() =>
                setActiveSlide((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )
              }
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={() =>
                setActiveSlide((prev) =>
                  prev === testimonials.length - 1 ? 0 : prev + 1
                )
              }
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
