// src/components/SearchResults.js
import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { memo } from "react";


const SearchResult = ({ results }) => {
  console.log("I am running searchresult");
  return (
    <Container className="mt-3">
      {results?.length > 0 ? (
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
            {results.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result.name}</td>
                <td>{result.latitude}</td>
                <td>{result.longitude}</td>
                <td>{result.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="no-results">No results found</p>
      )}
    </Container>
  );
};

export default memo(SearchResult);
