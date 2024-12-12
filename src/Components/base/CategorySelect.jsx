import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import { useNavigate } from "react-router-dom";
function CategorySelect() {
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [categories, setCategories] = useState([
    { _id: "All", title: "All category" },
  ]);
  const [subcategory, setSubcategory] = useState([]);

  const navigate = useNavigate();
  const get_category = async () => {
    try {
      const response = await axios_instance.get("api/get_category");
      console.log(response);
      // const {}
      setCategories(response?.data?.categories);
      const AllSubCategories = response.data.categories
        .map((category) => category.sub_category)
        .flat()
        .filter((sub) => sub.status !== false);
      const refinedSubcategories = AllSubCategories.slice(0, 12);
      console.log(refinedSubcategories);

      setSubcategory(refinedSubcategories);
    } catch (error) {
      //   const { message } = error?.response?.data;
      console.log(error);

      //   toast.error(message);
    }
  };
  useEffect(() => {
    get_category();
  }, []);
  const handleCategoryChange = (value) => {
    setSelectedCategory(value.title);
    if (value.title === "All Category") {
      const AllSubCategories = categories
        .map((category) => category.sub_category)
        .flat()
        .filter((sub) => sub.status !== false);
      const refinedSubcategories = AllSubCategories.slice(0, 12);
      setSubcategory(refinedSubcategories);
    } else {
      const subCategory = categories
        .filter((category) => value._id === category._id)
        .map((sub) => sub.sub_category)[0]
        .filter((sub) => sub.status === true);
      console.log(subCategory);
      setSubcategory(subCategory);
    }
  };
  console.log(selectedCategory);

  //   const categories = [
  //     { value: "all", label: "All Categories" },
  //     { value: "design", label: "Design" },
  //     { value: "development", label: "Development" },
  //     { value: "marketing", label: "Marketing" },
  //     { value: "it", label: "IT & Software" },
  //     { value: "business", label: "Business" },
  //     { value: "health", label: "Health & Fitness" },
  //     { value: "finance", label: "Finance" },
  //     { value: "personal", label: "Self-help" },
  //     { value: "music", label: "Music" },
  //   ];
  return (
    <>
      <section className="py-16 md:py-24 px-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Explore Course Categories
          </h2>

          {/* Mobile dropdown */}
          <div className="lg:hidden mb-8 rounded-full">
            <Select
              value={selectedCategory.title}
              onValueChange={(value) => handleCategoryChange(value)}
            >
              <SelectTrigger className="w-full rounded-3xl text-white bg-gradient-to-r from-primary to-purple-600 h-12 ps-6">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop tabs */}
          <div className="hidden lg:block">
            <Tabs
              defaultValue=""
              value={selectedCategory.title}
              onValueChange={(value) => handleCategoryChange(value)}
            >
              <TabsList className="grid w-full grid-cols-3  text-white bg-gradient-to-r from-primary to-purple-600 lg:grid-cols-10 gap-4 h-12 ps-2 rounded-full">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category._id}
                    className="rounded-full h-9 "
                    value={category}
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Content for selected category */}
          <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subcategory.map((sub, index) => (
                <motion.button
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    navigate(`/category/${sub.category_id}/${sub.title}`)
                  }
                >
                  <h3 className="font-semibold text-lg mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    {sub.title}
                  </h3>
                  <p className="text-sm text-gray-600">20+ Courses</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CategorySelect;
