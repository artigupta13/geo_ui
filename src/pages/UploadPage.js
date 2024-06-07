import FileUpload from "../components/FileUpload";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const UploadPage = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <FileUpload setUploadSuccess={setUploadSuccess} />
          {uploadSuccess && <p className="message">Data migration started</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPage;
