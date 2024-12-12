import React, { useEffect, useState } from "react";
import {
  Search,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Menu,
  CircleChevronLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbEllipsis,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
import { toast } from "sonner";
import Pagination_Handler from "./Pagination";
import {
  useUser_Management_Mutation,
  useUser_management,
} from "@/Hooks/Coustom_Hooks_useFetching";
import { useQuery } from "@tanstack/react-query";

// const students = [
//   {
//     id: 1,
//     name: "Anna",
//     progressRate: "87%",
//     dateEnrolled: "10-05-2024",
//     taskCompletion: "95%",
//     overallPerformance: "92%",
//   },
//   {
//     id: 2,
//     name: "Anna",
//     progressRate: "87%",
//     dateEnrolled: "10-05-2024",
//     taskCompletion: "95%",
//     overallPerformance: "92%",
//   },
//   {
//     id: 3,
//     name: "Anna",
//     progressRate: "87%",
//     dateEnrolled: "10-05-2024",
//     taskCompletion: "95%",
//     overallPerformance: "92%",
//   },
//   {
//     id: 4,
//     name: "Anna",
//     progressRate: "87%",
//     dateEnrolled: "10-05-2024",
//     taskCompletion: "95%",
//     overallPerformance: "92%",
//   },
//   {
//     id: 5,
//     name: "Anna",
//     progressRate: "87%",
//     dateEnrolled: "10-05-2024",
//     taskCompletion: "95%",
//     overallPerformance: "92%",
//   },
//   {
//     id: 6,
//     name: "Anna",
//     progressRate: "87%",
//     dateEnrolled: "10-05-2024",
//     taskCompletion: "95%",
//     overallPerformance: "92%",
//   },
//   {
//     id: 7,
//     name: "Anna",
//     progressRate: "87%",
//     dateEnrolled: "10-05-2024",
//     taskCompletion: "95%",
//     overallPerformance: "92%",
//   },
//   {
//     id: 8,
//     name: "Anna",
//     progressRate: "87%",
//     dateEnrolled: "10-05-2024",
//     taskCompletion: "95%",
//     overallPerformance: "92%",
//   },
// ];

export default function User_Management({ current_role, route }) {
  //state for handle search input
  const [searchTerm, setSearchTerm] = useState("");
  //state for handle role based on current role
  const [role, setRole] = useState("");
  //state for handle get all user route based on the role
  const [get_all_user_route, setGet_all_user_route] = useState("");
  //state for handle block user route
  const [block_user_route, setBlock_user_route] = useState("");
  //state for handle unblock user route
  const [unblock_user_route, setUnblock_user_route] = useState("");
  //state for handle is page changed or not
  const [is_page_changed, SetIs_page_changed] = useState(false);
  const [raw_data, setRaw_data] = useState([]);
  //stata for handle user data based on role
  const [user_data, setUser_data] = useState([]);

  // const [searching,setSearching] = useState([])

  // const { mutate: handleBlock } = useUser_Management_Mutation();

  //UseEffect to handle role of the user based on current role
  useEffect(() => {
    setRole(current_role);
    setGet_all_user_route(route);
    if (role === "Student") {
      // setGet_all_user_route("/api/admin/get_all_student");
      setBlock_user_route("/api/admin/block_student");
      setUnblock_user_route("/api/admin/unblock_student");
    } else if (role === "Instructor") {
      // setGet_all_user_route("/api/admin/get_all_instructor");
      setBlock_user_route("/api/admin/block_instructor");
      setUnblock_user_route("/api/admin/unblock_instructor");
    }
    return;
  }, [current_role, role]);

  //Useffect to handle get user data based on the role

  const get_user_data = async () => {
    try {
      console.log(get_all_user_route);
      const response = await axios_instance.get(route);
      // console.log(response);
      setRaw_data(response?.data?.user_data);
      return response?.data
    } catch (error) {
      console.log(error);
      setUser_data([]);
    }
  };
  // useUser_management(get_user_data);
  const user_manage = useQuery({
    queryKey:["users"],
    queryFn:get_user_data
  })
  user_manage
  useEffect(() => {
    get_user_data();
  }, [is_page_changed]);

  //Function to handle user block
  const handle_block = async (user_id) => {
    try {
      const response = await axios_instance.put(block_user_route, {
        _id: user_id,
      });
      const { success, message } = response?.data;
      if (success) {
        // handleBlock(data)
        toast.success(message);
        SetIs_page_changed(!is_page_changed);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };

  //Function to handle user unblock

  const handle_unblock = async (user_id) => {
    try {
      const response = await axios_instance.put(unblock_user_route, {
        _id: user_id,
      });
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        SetIs_page_changed(!is_page_changed);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };
  useUser_Management_Mutation(handle_unblock);
  //Funtion to handle pagination
  const handlePagination = (paged_user_data) => {
    setUser_data(paged_user_data);
  };
  //Function to handle search the user
  const handle_search = (e) => {
    const term = e.target.value;

    setSearchTerm(term);
    const searched_data = raw_data.filter(
      (data) =>
        data.name.toLowerCase().includes(term.toLowerCase()) ||
        data.email.toLowerCase().includes(term.toLowerCase())
    );
    setUser_data(searched_data);
  };
  return (
    <>
      <div className="max-w-7xl mx-auto lg:ms-2">
        <div className="items-center justify-between mb-6">
          {/* breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/admin/dashboard">Admin</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{`${role} Management`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl mt-2 font-bold">{`${role} Management`}</h2>
        </div>

        {/* Search input */}
        <div className="relative block mb-6 w-64">
          <input
            type="text"
            placeholder={`Search ${role}s`}
            value={searchTerm}
            onChange={handle_search}
            className="w-64 h-9 pl-5 pr-4 py-2 border border-neutral-950 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-neutral-800"
          />
          <button className="absolute right-0 top-0 h-9 w-9  border rounded-full bg-white border-neutral-950">
            <Search className="absolute left-2 top-2 h-5 w-5 text-neutral-600 " />
          </button>
        </div>

        {/* Mobile view: Cards */}
        <div className="lg:hidden space-y-4">
          {user_data.length !== 0 &&
            user_data.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{student.name}</h3>
                    <Button
                      variant="outline"
                      className="bg-neutral-900 text-white"
                      size="sm"
                      onClick={() =>
                        student.is_blocked
                          ? handle_unblock(student._id)
                          : handle_block(student._id)
                      }
                    >
                      {student.is_blocked ? "Unblock" : "Block"}
                    </Button>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      Date of Joined:{" "}
                      {student?.created_at?.split("T")[0] ||
                        student?.joined_at?.split("T")[0] ||
                        "Nil"}
                    </p>
                    <p>
                      {`${role} Email`}: {student.email || "Nil"}
                    </p>
                    <p>Task Completion: {student.taskCompletion || "Nil"}</p>
                    <p>
                      Overall Performance: {student.overallPerformance || "Nil"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          {user_data.length === 0 && (
            <Card>
              <CardHeader>
                <h1 className="font-bold text-xl">{`No ${role}s Found`}</h1>
              </CardHeader>
            </Card>
          )}
        </div>

        {/* Desktop view: Table */}
        <div className="hidden lg:block bg-white rounded-lg overflow-hidden">
          <Table className="border border-neutral-400">
            <TableHeader className="bg-neutral-950 hover:bg-black">
              <TableRow>
                <TableHead className="w-[50px]  text-white text-center">
                  No.
                </TableHead>
                <TableHead className=" text-white text-center">Name</TableHead>
                <TableHead className=" text-white text-center">
                  Date of Joined
                </TableHead>
                <TableHead className=" text-white text-center">Email</TableHead>
                <TableHead className=" text-white text-center">
                  Task completion
                </TableHead>
                <TableHead className=" text-white text-center">
                  Overall performance
                </TableHead>
                <TableHead className="text-center text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border border-neutral-400 rounded-xl">
              {user_data.length !== 0 &&
                user_data.map((student, index) => (
                  <TableRow
                    key={student._id}
                    className="border border-neutral-400"
                  >
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-left pl-4">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {student?.created_at?.split("T")[0] ||
                        student?.joined_at?.split("T")[0] ||
                        "Nil"}
                    </TableCell>
                    <TableCell className="text-center ">
                      {student.email || "Nil"}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.taskCompletion || "Nil"}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.overallPerformance || "Nil"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-neutral-900 text-white"
                        onClick={() =>
                          student.is_blocked
                            ? handle_unblock(student._id)
                            : handle_block(student._id)
                        }
                      >
                        {student.is_blocked ? "Unblock" : "Block"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {user_data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <h1 className="text-center text-xl font-bold">{`No ${role}s Found`}</h1>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* <div className="flex items-center justify-center space-x-2 mt-8">
          <Button
            variant="outline"
            className="rounded-full p-0.5 border-2 border-neutral-950"
            size="xs"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="xs"
            className="rounded-full px-2.5 py-0.5 border-2 border-neutral-950 text-white bg-neutral-950 "
          >
            1
          </Button>
          <Button
            variant="outline"
            size="xs"
            className="rounded-full px-2 py-0.5 border-2 border-neutral-950 "
          >
            2
          </Button>
          <Button
            variant="outline"
            size="xs"
            className="rounded-full px-2 py-0.5 border-2 border-neutral-950 "
          >
            3
          </Button>
          <Button
            variant="outline"
            size="xs"
            className="rounded-full px-2 py-0.5 border-2 border-neutral-950 "
          >
            4
          </Button>
          <Button
            variant="outline"
            size="xs"
            className="rounded-full p-0.5 border-2 border-neutral-950 "
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div> */}
        <Pagination_Handler
          data={raw_data}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
}
