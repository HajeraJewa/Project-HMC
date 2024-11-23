import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="hero">
      <Card className="bg-night text-white border-0">
        <Card.Body className="d-flex flex-row align-items-center">
          <Col md={6} className="">
            <div className="d-flex flex-column justify-content-center h-100">
              <Card.Title as="h1" className="display-3 text-center mb-4 fw-bold text-dark">e-Commerce</Card.Title>
              <Card.Text className="lead text-center mb-4 text-dark">
              Discover the latest collection of items. We offer items that are stylish yet comfortable
              </Card.Text>
              <Card.Text className="last-updated text-center text-dark mb-0">new update products</Card.Text>
            </div>
          </Col>
          <Col md={6} className="p-0">
            <Card.Img 
              src="/assets/eccomert.jpg" 
              alt="Sneakers" 
              className="img-fluid" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </Col>
        </Card.Body>
      </Card>

      <footer className="bg-dark text-white py-4 mt-auto">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start">
              <p>© 2024 HajeraCompany. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <a href="/privacy" className="text-white text-decoration-none me-3">Privacy Policy</a>
              <a href="/terms" className="text-white text-decoration-none">Terms of Service</a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
