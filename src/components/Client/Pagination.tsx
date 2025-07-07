import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationDemoProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // Maximum number of page buttons to show
}

export function PaginationDemo({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationDemoProps) {
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Calculate which page numbers to display
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage >= totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={currentPage === 1 ? undefined : handlePrevious}
            className={
              currentPage === 1 ? "cursor-not-allowed text-gray-400" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Always show first page */}
        {visiblePages[0] > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(1)}
              isActive={1 === currentPage}
              className={
                1 === currentPage
                  ? "bg-secondary text-white text-sm"
                  : "border cursor-pointer"
              }
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Start ellipsis */}
        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Visible page numbers */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
              className={
                page === currentPage
                  ? "bg-secondary text-white text-sm"
                  : "border cursor-pointer"
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* End ellipsis */}
        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Always show last page */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(totalPages)}
              isActive={totalPages === currentPage}
              className={
                totalPages === currentPage
                  ? "bg-secondary text-white text-sm"
                  : "border cursor-pointer"
              }
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={currentPage === totalPages ? undefined : handleNext}
            className={
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}