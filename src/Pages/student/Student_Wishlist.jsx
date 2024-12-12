"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Heart,
  Home,
  LayoutDashboard,
  Library,
  LogOut,
  Medal,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
// import { usePathname } from "next/navigation";
import { toast } from "sonner";
import CardWishlist from "@/Components/base/CardWishlist";
import CourseContainer from "@/Components/base/CourseContainer";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";

export default function WishlistPage() {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const [WishlistedCourses, setWishlistedCourses] = useState([]);
  const [isWishlistChanged, setIsWishlistChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  //   const pathname = usePathname();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    courseId: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isMutated, setIsMutated] = useState(false);
  const get_wishlisted_items = async () => {
    try {
      const response = await axios_instance.get(
        `api/get_wishlist/${student_id}`
      );
      const { wishlist_items, success } = response?.data;
      if (success) {
        setWishlistedCourses(wishlist_items.wishlist_items);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    get_wishlisted_items();
  }, [isWishlistChanged,isMutated]);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/courses", icon: BookOpen, label: "All courses" },
    { href: "/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/certificates", icon: Medal, label: "Certificates" },
    { href: "/learning", icon: GraduationCap, label: "Learning" },
  ];

  const handleChange = (val) => {
    setIsMutated(!val)
  };

  const handleWishlistChange = (val)=>{
    setIsWishlistChanged(!val)
  }
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 md:pt-0 pt-1 overflow-auto bg-gradient-to-br to-primary/10 from-purple-50 via-blue-50">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="sticky top-0 z-10 bg-transparent border-b"
        >
          <div className="container mx-auto px-6 py-4 flex items-center justify-between ">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
              >
                <Library className="h-6 w-6" />
              </Button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b">
                        <Link
                          href="/"
                          className="flex items-center gap-2 font-bold text-2xl"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary" />
                          CourseCloud
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleMenu}
                        >
                          <X className="h-6 w-6" />
                        </Button>
                      </div>
                      <ScrollArea className="flex-1 px-3 py-4">
                        <div className="space-y-1">
                          {navItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              )}
                              onClick={toggleMenu}
                            >
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={toggleMenu}
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </Button>
                        </div>
                      </ScrollArea>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween" }}
                  className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                  onClick={toggleMenu}
                />
              )}
              <h1 className="text-2xl font-bold">Wishlist</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                {WishlistedCourses.length} courses
              </span>
            </div>
          </div>
        </motion.header>

        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-6 py-4"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <span className="text-foreground font-medium" aria-current="page">
                Wishlist
              </span>
            </li>
          </ol>
        </motion.nav>

        <div className="container mx-auto px-6 py-8">
          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-card rounded-lg overflow-hidden border shadow-sm"
                    >
                      <div className="aspect-video bg-muted animate-pulse" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                      </div>
                    </motion.div>
                  ))
                : WishlistedCourses.map((course) => (
                    <motion.div
                      key={course._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      className="group relative rounded-lg overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <CardWishlist
                        handleChange={handleWishlistChange}
                        value={isWishlistChanged}
                        course={course}
                      />
                    </motion.div>
                  ))}
              {WishlistedCourses.length === 0 && (
                <div className="text-center w-full">
                  <h3 className="text-4xl  font-bold">Oops! wishlist is Empty</h3>
                  <p>Add items to your wishlist and achieve your dreams.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Recommended Courses */}
          <CourseContainer
            wishlistMutation={handleChange}
            value={isMutated}
            title={"Our Top Picks For You"}
          />
        </div>
      </main>
    </>
  );
}
