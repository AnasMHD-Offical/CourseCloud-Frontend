import React from "react";
import { motion } from "framer-motion";
function Features({features}) {
  return (
    <>
      <section className="py-16 md:py-24 bg-gray-50 px-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Why Choose CourseCloud?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <feature.icon className="w-12 h-12 text-primary  mb-4 " />
                <h3 className="text-xl font-semibold mb-2 from-primary  bg-clip-text text-transparent bg-gradient-to-r  to-purple-600">
                  {feature.title}
                </h3>
                <p className="from-black to-purple-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
