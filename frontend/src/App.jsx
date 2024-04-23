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
  const limit = 5; // Define the limit for each page here

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
    fetchResults("");
  }, []);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/search", {
        query: "",
        limit,
        offset: (page - 1) * limit,
      });
      setResults(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <SearchBox onSearch={fetchResults} />
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
