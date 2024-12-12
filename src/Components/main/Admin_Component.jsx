import React, { useState } from "react";
import {
  User,
  LogOut,
  Menu,
  GraduationCap,
  LayoutDashboard,
  BookOpenCheck,
  Sparkle,
  LandPlot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Admin_Auth from "@/Auth/Admin_Auth";
import { admin_logout } from "@/Redux/Slices/AdminSlice";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import Footer from "../base/Footer";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export default function Admin() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios_instance.post("/api/admin/admin_logout");
      const { success, message } = response?.data;
      if (success) {
        localStorage.removeItem("admin_data");
        dispatch(admin_logout());
        toast.success(message);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/profile", icon: User, label: "Profile" },
    {
      href: "/admin/student_management",
      icon: GraduationCap,
      label: "Student Management",
    },
    {
      href: "/admin/instructor_management",
      icon: BookOpenCheck,
      label: "Instructor Management",
    },
    {
      href: "/admin/course_management",
      icon: LandPlot,
      label: "Course Management",
    },
    {
      href: "/admin/category_management",
      icon: Sparkle,
      label: "Category Management",
    },
  ];
  // const SidebarContent = () => (
  //   <nav className="bg-white">
  //     <ul className="space-y-2">
  //       {[
  //         { path: "", label: "Dashboard" },
  //         { path: "profile", label: "Profile" },
  //         { path: "student_management", label: "Student Management" },
  //         { path: "instructor_management", label: "Instructor Management" },
  //         { path: "course_management", label: "Course Management" },
  //         { path: "category_management", label: "Category Management" },
  //       ].map((item, index) => (
  //         <li key={index}>
  //           <NavLink
  //             to={item.path}
  //             //   className={(isActive) => `
  //             //       ? "bg-neutral-950 text-white"
  //             //       : "text-gray-700 hover:bg-gray-200"
  //             //   }`}
  //             className={({ isActive }) =>
  //               isActive && index !== 0
  //                 ? `block px-4 py-2 rounded-md bg-neutral-950 text-white `
  //                 : "block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
  //             }
  //           >
  //             {item.label}
  //           </NavLink>
  //         </li>
  //       ))}
  //     </ul>
  //     <button
  //       className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center"
  //       onClick={}
  //     >
  //       <LogOut className="mr-2 h-4 w-4" /> Logout
  //     </button>
  //   </nav>
  // );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border">
        <div className="max-w-7xl mx-auto xl:ms-1 px-4 sm:px-6 lg:px-8 xl:pe-0  py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] sm:w-[300px]">
                <div className="py-4">
                  <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className=" flex lg:hidden flex-col w-64 "
                  >
                    <ScrollArea className="flex-1 px-3 py-3 ">
                      <div className="space-y-1">
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-800 hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <item.icon className="h-4 w-4 text-accent-foreground" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    </ScrollArea>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold text-gray-900">CourseCloud</h1>
          </div>
          {/* <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-64 h-9 pl-5 pr-4 py-2 border border-neutral-950 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
              />
              <button className="absolute right-0 top-0 h-9 w-9  border rounded-full bg-white border-neutral-800">
                <Search className="absolute left-2 top-2 h-5 w-5 text-neutral-600 " />
              </button>
            </div>
            <User className="h-6 w-6 text-gray-500" />
          </div> */}
        </div>
      </header>

      <div className="flex-1 flex">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="hidden lg:flex flex-col w-64 border-r bg-card "
        >
          <ScrollArea className="flex-1 px-3 py-3">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-800 hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 text-accent-foreground" />
                  {item.label}
                </Link>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </ScrollArea>
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 bg-gradient-to-r from-purple-50 via-blue-50 to-primary/10">
          <Admin_Auth>
            <Outlet />
          </Admin_Auth>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
