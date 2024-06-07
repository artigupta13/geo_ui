import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import React, { useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";

const SearchPage = () => {
  const [results, setResults] = useState([]);

  const handleSetResults = useCallback((newResults) => {
    setResults(newResults);
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <SearchForm setResults={handleSetResults} />
          <SearchResult results={results} />
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
