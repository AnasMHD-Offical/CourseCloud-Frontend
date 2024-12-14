import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Hero({ heroRef, heroOpacity, heroScale }) {
  return (
    <>
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-br from-primary/10 via-purple-100 to-blue-50 py-24 md:py-32 overflow-hidden px-10"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center relative z-10">
          <motion.div
            className="md:w-[61.8%] mb-8 md:mb-0 pr-0 md:pr-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mt-10 md:mt-0   text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Unlock Your Potential with CourseCloud
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Discover expert-led courses and transform your skills. Start your
              learning journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* <AnchorLink href="#course">
                <Button
                  size="lg"
                  className="text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-primary hover:bg-primary/90"
                >
                  Explore Courses
                </Button>
              </AnchorLink> */}
              {/* <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" /> Watch Demo
              </Button> */}
            </div>
          </motion.div>
          <motion.div
            className="md:w-[38.2%]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div className="relative" whileHover={{ scale: 1.05 }}>
              <img
                src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg"
                alt="Students learning"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-lg font-bold">10,000+</p>
                <p className="text-sm text-gray-600">Active Students</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 mix-blend-multiply"></div>
      </motion.section>
    </>
  );
}

export default Hero;
