import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
function CallForTutor() {
  const navigate = useNavigate();
  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Tutor Community Today!
          </h2>
          <p className="text-xl mb-8">
            Join our platform and connect with thousands of eager learners as a
            tutor! Share your expertise <br /> through online courses and make a
            meaningful impact today
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/instructor/register")}
            className="rounded-full px-8 py-3 text-lg bg-white text-primary hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </>
  );
}

export default CallForTutor;
