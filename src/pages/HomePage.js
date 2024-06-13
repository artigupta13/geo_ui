import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";


const HomePage = () => {
  return (
    <Container>
        <Row className="align-items-center my-3">
          <Col xs={4}></Col>
          <Col xs={4} className="text-center">
            <h1 className="app-title">Geo Application</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
        <Col className="text-center">
          <Image src="geo.png" fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
