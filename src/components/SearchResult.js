// src/components/SearchResults.js
import React from "react";
import { Table, Container } from "react-bootstrap";
import { memo } from "react";

const SearchResult = ({ results, loading = false }) => {
  return (
    <Container className="mt-3">
      {!results && loading ? (
        <p>loading</p>
      ) : (
        <Table striped bordered hover>
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>latitude</th>
              <th>longitude</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {results.suggestions?.map((result, index) => (
              <tr
                key={
                  results.currentPage === 1
                    ? index + 1
                    : (results.currentPage - 1) * 10 + index + 1
                }
              >
                <td>
                  {results.currentPage === 1
                    ? index + 1
                    : (results.currentPage - 1) * 10 + index + 1}
                </td>
                <td>{result.name}</td>
                <td>{result.latitude}</td>
                <td>{result.longitude}</td>
                <td>{result.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default memo(SearchResult);
