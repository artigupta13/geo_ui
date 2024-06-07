// src/components/FileUpload.js
import React, { useState, useCallback } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import migrate from "../services/migrateData";

const FileUpload = ({ setUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!file) {
        setError("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        await migrate(formData);
        setUploadSuccess(true);
        setFile(null);
      } catch (error) {
        setError("Error uploading file");
        console.error(error);
      }
    },
    [file, setUploadSuccess]
  );

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row className="align-items-center my-3">
          <Col xs={12} className="text-center">
            <h1 className="app-title">Upload CSV</h1>
          </Col>
        </Row>
        <Row className="align-items-center my-3">
          <Col>
            <Form.Group controlId="formFile">
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="align-items-center my-3">
          <Col xs={12} className="text-center">
            {" "}
            <button type="submit" className="me-2 submit-button">
              Upload
            </button>
          </Col>
        </Row>
        <Row>
          <div className="upload-instructions">
            <p className="p1">Please upload a CSV file in the following format:</p>
            <p className="p2">
              street, city, zip_code, county, country, latitude, longitude,
              time_zone
            </p>
          </div>
        </Row>
      </Form>
    </Container>
  );
};

export default React.memo(FileUpload);
