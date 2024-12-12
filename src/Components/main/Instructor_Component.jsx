import React, { useState } from "react";
import {
  Search,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Menu,
  LayoutDashboard,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import Footer from "../base/Footer";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { instructor_logout } from "@/Redux/Slices/Instructor_Slice";
import Instructor_Auth from "@/Auth/Instructor_Auth";

export default function Instructor() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios_instance.post(
        "/api/instructor/instructor_logout"
      );
      const { success, message } = response?.data;
      if (success) {
        localStorage.removeItem("instructor_data");
        dispatch(instructor_logout());
        toast.success(message);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };

  const SidebarContent = () => (
    <nav className="bg-white">
      <ul className="space-y-2">
        {[
          { path: "dashboard", label: "Dashboard" },
          { path: "profile", label: "Profile" },
          { path: "create_course", label: "Create Course" },
          { path: "Student Progress", label: "Student progress" },
        ].map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `block px-4 py-2 rounded-md bg-neutral-950 text-white `
                  : "block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center"
        // onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </button>
    </nav>
  );
  const navItems = [
    { href: "/instructor", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/instructor/profile", icon: User, label: "Profile" },
    {
      href: "/instructor/create_course",
      icon: BookOpen,
      label: "Create Course",
    },
    {
      href: "/instructor/course_management",
      icon: TrendingUp,
      label: "Course Management",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col px-auto">
      {/* Header */}
      <header className="bg-white shadow-sm border">
        <div className="max-w-7xl mx-auto xl:ms-1 px-4 sm:px-6 lg:px-8 xl:pe-0  py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] sm:w-[300px]">
                <div className="py-4">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold text-gray-900">CourseCloud</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="hidden md:flex flex-col w-64 border-r bg-card "
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
          <Instructor_Auth>
            <Outlet />
          </Instructor_Auth>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
