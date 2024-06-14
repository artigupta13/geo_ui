import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";
import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PaginatedLocation from "../components/PaginatedLocation";
import search from "../services/searchService";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchFields, setSearchFields] = useState({});

  const fetchResults = useCallback(async (searchFields, page = 1) => {
    try {
      setLoading(true);
      const response = await search({ ...searchFields, page });
      setResults(response.data.suggestions);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setSearchFields(searchFields);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  }, []);

  useEffect(() => {
    fetchResults(searchFields, currentPage);
  }, [fetchResults, currentPage, searchFields]);

  const handleSearch = useCallback(
    (fields) => {
      setCurrentPage(1); // Reset to first page for new search
      fetchResults(fields, 1);
    },
    [fetchResults]
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <SearchForm fetchResults={handleSearch} />
          <SearchResult results={results} loading={loading} />
          <PaginatedLocation
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
