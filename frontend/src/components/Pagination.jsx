import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate the maximum number of pagination buttons to show
  const maxButtons = 10;
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
      )}
      {pageButtons}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
      )}
    </div>
  );
};

export default Pagination;
