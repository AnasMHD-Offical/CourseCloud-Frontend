import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data to paginate through
// const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`)

export default function Pagination_Handler({ data, handlePagination }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageChanged, setIsPageChanged] = useState(false);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handleParentElementPagination = () => {
    handlePagination(currentItems);
  };
  //   handleParentElementPagination()

  useEffect(() => {
    handleParentElementPagination();
  }, [data, currentPage]);
  return (
    <div className="space-y-4">
      {/* <ul className="space-y-2"> */}
      {/* {currentItems.map((item, index) => (
          <li key={startIndex + index} className="p-2 bg-gray-100 rounded">
            {item}
          </li>
        ))} */}
      {/* </ul> */}

      { totalPages > 1 &&
        <Pagination className={"mt-4"}>
          <PaginationContent>
            <PaginationItem className="rounded-full">
              <PaginationLink
                className="border rounded-full border-neutral-950"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              >
                <ChevronLeft />
              </PaginationLink>
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              // Show first page, last page, and pages around the current page
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page} className="rounded-full p-1 ">
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      className={`border rounded-full border-neutral-950 ${
                        currentPage === page
                          ? "bg-neutral-950 text-white"
                          : "bg-white text-neutral-950"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <PaginationEllipsis key={page} />;
              }
              return null;
            })}

            <PaginationItem className="rounded-full">
              <PaginationLink
                className="border rounded-full border-neutral-950"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              >
                <ChevronRight />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      }
    </div>
  );
}
