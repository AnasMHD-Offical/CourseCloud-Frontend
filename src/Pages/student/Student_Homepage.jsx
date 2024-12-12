import { useState, useEffect, useRef } from "react";
import { BookOpen, Users, Award } from "lucide-react";
import { useScroll, useTransform } from "framer-motion";
import PromoBanner from "@/Components/base/PromoBanner";
import Testimonials from "@/Components/base/Testimonials";
import Footer from "@/Components/base/Footer";
import "../../Components/base/CustomStyle.css";
import CourseContainer from "@/Components/base/CourseContainer";
import Features from "@/Components/base/Features";
import Header from "@/Components/base/Header";
import Hero from "@/Components/base/Hero";
import CategorySelect from "@/Components/base/CategorySelect";
import TopPick from "@/Components/base/TopPick";
import CallForTutor from "@/Components/base/CallForTutor";




export default function HomePage() {

  // Use ref to handle the hero scrolling animation 
  const heroRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Expert-led Courses",
      description:
        "Learn from industry professionals and gain practical skills",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Engage with peers and instructors in interactive sessions",
    },
    {
      icon: Award,
      title: "Recognized Certifications",
      description: "Earn certificates valued by top employers worldwide",
    },
  ];
  const slides = [
    {
      title: "50% OFF",
      subtitle: "for Yoga class by Hira Malick",
      image:
        "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730557176/lxl2fjkpbpfmkmavnny2.jpg",
    },
    {
      title: "30% OFF",
      subtitle: "for Web Development Bootcamp",
      image:
        "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg",
    },
    {
      title: "Free Trial",
      subtitle: "for Data Science Fundamentals",
      image:
        "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730618389/fzsfui8pyz40kigslkra.jpg",
    },
  ];
  const testimonials = [
    {
      name: "John Doe",
      role: "Web Developer",
      content:
        "CourseCloud has transformed my career. The courses are top-notch!",
      avatar: "https://placehold.co/600x400",
    },
    {
      name: "Jane Smith",
      role: "Data Scientist",
      content:
        "I've learned so much from the expert instructors. Highly recommended!",
      avatar: "https://placehold.co/600x400",
    },
    {
      name: "Alex Johnson",
      role: "UX Designer",
      content:
        "The practical projects have greatly improved my portfolio. Thank you, CourseCloud!",
      avatar: "https://placehold.co/600x400",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}

      <Header isScrolled={isScrolled} page={"Home"} />

      {/* Hero Section */}
      <Hero heroRef={heroRef} heroOpacity={heroOpacity} heroScale={heroScale} />

      {/* Trending Courses */}
      <CourseContainer title={"Trending Courses"} cards_data={[]} />

      {/* Promo Banner */}
      <PromoBanner slides={slides} />
      {/* Features Section */}
      <Features features={features} />

      {/* Bestselling Courses */}
      <CourseContainer title={"Bestselling Courses"} cards_data={[]} />

      {/* Course Categories */}
      <CategorySelect />

      {/* Our top pick for you */}
      <TopPick />

      {/* Call For tutors */}
      <CallForTutor />

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
