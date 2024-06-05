// src/components/SearchForm.js
import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(".......", name);
    setSearchFields({ ...searchFields, [name]: value });
  };

  // Function to clear search input
  const handleClearField = (field) => {
    setSearchFields({ ...searchFields, [field]: "" });
    console.log("this is running");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const lat = searchFields.latitude ? parseFloat(searchFields.latitude) : 0;
      const lon = searchFields.longitude
        ? parseFloat(searchFields.longitude)
        : 0;
      if (isNaN(lat) || lat < -90 || lat > 90) {
        setError("Please enter a valid latitude between -90 and 90 degrees.");
        return;
      }

      if (isNaN(lon) || lon < -180 || lon > 180) {
        setError(
          "Please enter a valid longitude between -180 and 180 degrees."
        );
        return;
      }
      const response = await search(searchFields);
      setResults(response);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col>
            <Form.Group controlId="name">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={searchFields.name}
                  onChange={handleChange}
                />
                <Button
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
                  name="latitude"
                  value={searchFields.latitude}
                  onChange={handleChange}
                />
                <Button
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
                  name="longitude"
                  value={searchFields.longitude}
                  onChange={handleChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleClearField("longitude")}
                >
                  &times;
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            {" "}
            <Button variant="primary" type="submit" className="me-2">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SearchForm;