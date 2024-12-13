"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  GraduationCap,
  Heart,
  LayoutDashboard,
  LogOut,
  Medal,
  User,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "@/Components/base/Header";
import Footer from "@/Components/base/Footer";
import { axios_instance } from "@/Config/axios_instance";
import { useDispatch } from "react-redux";
import { student_logout } from "@/Redux/Slices/StudentSlice";
import { toast } from "sonner";

export default function Student_Main() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/profile", icon: User, label: "Profile" },
    { href: "/dashboard/courses", icon: BookOpen, label: "My Courses" },
    { href: "/dashboard/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/dashboard/certificates", icon: Medal, label: "Certificates" },
  ];
  const handleLogout = async () => {
    try {
      const response = await axios_instance.post("/api/student_logout");
      const { success, message } = response?.data;
      if (success) {
        localStorage.removeItem("student_data");
        dispatch(student_logout());
        toast.success(message);
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors bg-gradient-to-br from-primary/10 via-purple-100 to-blue-50 duration-300">
      
      {/* Header */}
      <Header />
      
      <div className="flex border-t">
      
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="hidden xl:flex flex-col w-64 border-r bg-card "
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

        {/* Al subroutes are under the outlets */}
        <Outlet />
      
      </div>
      
      <Footer />
    </div>
  );
}
