// FILE: src/components/Pagination.tsx
// Pagination component for threat lists

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PaginationProps } from "@/types/threats";

interface ExtendedPaginationProps extends PaginationProps {
  className?: string;
}

const Pagination: React.FC<ExtendedPaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range if too close to boundaries
      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 shadow-lg ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Results Info */}
        <div className="text-sm text-gray-300">
          Showing <span className="font-medium text-white">{startItem}</span> to{" "}
          <span className="font-medium text-white">{endItem}</span> of{" "}
          <span className="font-medium text-white">{totalCount}</span> results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all ${
              currentPage === 1
                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <FiChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-gray-400"
                  >
                    ...
                  </span>
                );
              }

              const isCurrentPage = page === currentPage;

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(Number(page))}
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    isCurrentPage
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all ${
              currentPage === totalPages
                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
