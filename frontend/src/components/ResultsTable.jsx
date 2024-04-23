import React from "react";

const ResultsTable = ({ results }) => {
  return (
    <table id="results-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={result.id}>
            <td>{index + 1}</td>
            <td>{result.name}</td>
            <td>{result.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
