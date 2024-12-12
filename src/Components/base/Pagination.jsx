import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

export default function PaginationComp({ page, setPage, limit, total }) {
  console.log("Total : ",total ,"limir :", limit);  
  
  const totalPages = Math.ceil(total / limit);
  console.log("Total pages : ",totalPages);  
  return (
    <Pagination className={"pb-2"}>
      <PaginationContent className="flex gap-2">
        <PaginationItem>
            <PaginationPrevious className={"rounded-lg p-4 shadow bg-white text-black"} onClick={()=>setPage(page === 1 ? page : page - 1)} />
        </PaginationItem>
        {totalPages > 0 &&
          [...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink className={`rounded-lg shadow `} key={index}>
                <Button onClick={()=>setPage(index + 1)} className={`rounded-lg p-4 ${page === index + 1 ? "bg-gradient-to-r from-purple-800 to-purple-600 hover:bg-primary text-white" : "bg-white hover:bg-neutral-50 text-black"} shadow`} key={index}>{index + 1}</Button>
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext className={"rounded-lg p-4 shadow bg-white text-black"} onClick={()=>setPage(page === totalPages ? totalPages : page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

 
