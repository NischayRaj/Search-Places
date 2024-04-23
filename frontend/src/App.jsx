import React, { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import ResultsTable from "./components/ResultsTable";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./styles/styles.css";

const App = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  const fetchResults = async (query) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/search", {
        query,
        limit,
      });
      setResults(response.data.data);
      setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchResults(searchQuery); // Fetch results only when there's a search query
    }
  }, [searchQuery]); // Run useEffect whenever searchQuery changes

  const handleSearch = (query) => {
    setSearchQuery(query); // Update searchQuery state when a search is performed
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Adjust API call to fetch data for the selected page if needed
  };

  return (
    <div className="container">
      <SearchBox onSearch={handleSearch} />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {results.length === 0 ? (
            <div className="no-results">No result found</div>
          ) : (
            <>
              <ResultsTable results={results} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
