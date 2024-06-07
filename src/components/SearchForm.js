// src/components/SearchForm.js
import React, { useState, useCallback } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import search from "../services/searchService";

const SearchForm = ({ setResults }) => {
  const [searchFields, setSearchFields] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setSearchFields(prevFields => ({ ...prevFields, [name]: value }));
  }, []);

  // Function to clear search input
  const handleClearField = useCallback((field) => {
    setSearchFields(prevFields => ({ ...prevFields, [field]: '' }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');

    const lat = searchFields.latitude ? parseFloat(searchFields.latitude) : 0;
    const lon = searchFields.longitude ? parseFloat(searchFields.longitude) : 0;

    if (isNaN(lat) || lat < -90 || lat > 90) {
      setError('Please enter a valid latitude between -90 and 90 degrees.');
      return;
    }

    if (isNaN(lon) || lon < -180 || lon > 180) {
      setError('Please enter a valid longitude between -180 and 180 degrees.');
      return;
    }

    try {
      const response = await search(searchFields);
      setResults(response);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  }, [searchFields, setResults]);

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row className="align-items-center my-3">
          <Col xs={4}></Col>
          <Col xs={4} className="text-center">
            <h1 className="app-title">Geo Search</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="name">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="custom-textbox"
                  name="name"
                  value={searchFields.name}
                  onChange={handleChange}
                />
                <Button
                className="clear-button"
                  variant="outline-secondary"
                  onClick={() => handleClearField("name")}
                >
                  &times;
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="latitude">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="latitude"
                  className="custom-textbox"
                  name="latitude"
                  value={searchFields.latitude}
                  onChange={handleChange}
                />
                <Button
                className="clear-button"
                  variant="outline-secondary"
                  onClick={() => handleClearField("latitude")}
                  
                >
                  &times;
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="longitude">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="longitude"
                  className="custom-textbox"
                  name="longitude"
                  value={searchFields.longitude}
                  onChange={handleChange}
                />
                <Button
                className="clear-button"
                  variant="outline-secondary"
                  onClick={() => handleClearField("longitude")}
                >
                  &times;
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="align-items-center my-3">
          <Col xs={12} className="text-center">
            {" "}
            <button type="submit" className="me-2 submit-button">
              Search
            </button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SearchForm;
