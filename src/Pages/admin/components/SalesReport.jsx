"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { CalendarIcon, Download, FileSpreadsheet } from "lucide-react";
import { axios_instance } from "@/Config/axios_instance";
import PaginationComp from "@/Components/base/Pagination";
import { saveAs } from "file-saver";
// import { format } from "date-fns"

// Sample data (replace with actual data fetching logic)
const sampleData = [
  {
    transactionId: "12345",
    date: "2024-12-01",
    revenue: 100,
    buyerName: "John Doe",
    paymentMethod: "Credit Card",
  },
  {
    transactionId: "12346",
    date: "2024-12-02",
    revenue: 50,
    buyerName: "Jane Smith",
    paymentMethod: "PayPal",
  },
  // Add more sample data here
];

export default function SalesReport() {
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReports, setTotalReports] = useState();
  const [reportLimit, setReportLimit] = useState(8);
  const [totalRevenue, setTotalRevenue] = useState();
  const [totalSales, setTotalSales] = useState();
  const [totalProfits, setTotalProfilts] = useState();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTimeFilterChange = (value) => {
    setTimeFilter(value);
    if (value !== "custom") {
      setDateRange({
        startDate: null,
        endDate: null,
      });
    }
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0"); // Ensure 2 digits
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleDownloadSalesReportPdf = async () => {
    try {
      const response = await axios_instance.get(
        "/api/admin/get_download_sales_report_pdf",
        {
          params: {
            timeline: timeFilter,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, "CourseCloudSalesReport.pdf");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownloadSalesReportExcel = async () => {
    try {
      const response = await axios_instance.get(
        "/api/admin/get_download_sales_report_excel",
        {
          params: {
            timeline: timeFilter,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "CourseCloudSalesReport.xlsx");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = (format) => {
    if (format === "pdf") {
      //   generatePDF(filteredData, summary)
    } else {
      //   generateExcel(filteredData, summary)
    }
  };

  const get_sales_report = async (req, res) => {
    try {
      const response = await axios_instance.get("api/admin/get_sales_report", {
        params: {
          timeline: timeFilter,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          page: currentPage,
          limit: reportLimit,
        },
      });
      if (response?.data?.success) {
        setFilteredData(response?.data?.sales_report);
        setTotalReports(response?.data?.total_reports);
        const revenue = response?.data?.sales_report.reduce((sum, curr) => {
          return sum + parseFloat(curr?.course_price?.$numberDecimal);
        }, 0);
        setTotalRevenue(revenue);
        setTotalProfilts(revenue * 0.3);
        setTotalSales(response?.data?.sales_report.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_sales_report();
  }, [timeFilter, dateRange, currentPage]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Sales Report</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Select onValueChange={(value) => handleTimeFilterChange(value)}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yearly">Yearly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        {timeFilter === "custom" && (
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.startDate
                    ? formatDate(dateRange?.startDate)
                    : "Pick a start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.startDate}
                  onSelect={(date) =>
                    handleDateRangeChange({ ...dateRange, startDate: date })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.endDate
                    ? formatDate(dateRange?.endDate)
                    : "Pick a start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.endDate}
                  onSelect={(date) =>
                    handleDateRangeChange({ ...dateRange, endDate: date })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="flex gap-2 ml-auto ">
          <Button
            onClick={handleDownloadSalesReportPdf}
            className="bg-gradient-to-r from-primary/10 to-purple-800"
          >
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button onClick={handleDownloadSalesReportExcel}
           className="bg-gradient-to-r from-purple-800 to-primary/10"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className=" text-xl font-bold mb-2">Sales Overview</h3>
        <p className="font-medium bg-neutral-50 p-2 mb-2 shadow rounded">
          {`Total Revenue : Rs. ${totalRevenue}`}
        </p>
        <p className="font-medium bg-neutral-50 p-2 mb-2 shadow rounded">
          {`Total Purchases : ${totalSales}`}
        </p>
        <p className="font-medium bg-neutral-50 p-2 mb-2 shadow rounded">
          {`Total Profit : Rs. ${totalProfits ? totalProfits.toFixed(2) : 0}`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3 className=" text-xl font-bold">Sales Data</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Transaction Id</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Buyer Name</TableHead>
                  <TableHead>Instructor Name</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((sale, index) => (
                  <TableRow key={sale._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{sale?.transaction_id}</TableCell>
                    <TableCell>
                      {sale?.date_of_purchase
                        ? sale.date_of_purchase.toString().split("T")[0]
                        : "yyyy-mm-dd"}
                    </TableCell>
                    <TableCell>{sale?.course_price?.$numberDecimal}</TableCell>
                    <TableCell>{sale?.student_id?.name}</TableCell>
                    <TableCell>
                      {sale?.course_id?.instructor_id?.name}
                    </TableCell>
                    <TableCell>{sale?.payment_method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {totalReports > reportLimit && (
            <PaginationComp
              page={currentPage}
              setPage={handlePageChange}
              total={totalReports}
              limit={reportLimit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
