import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import ResultsTable from "./components/ResultsTable";
import Pagination from "./components/Pagination";

const App = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (query) => {
    // Perform API call and update results state
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Update results based on the selected page
  };

  return (
    <div className="container">
      <SearchBox onSearch={handleSearch} />
      <ResultsTable results={results} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
