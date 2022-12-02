import { Col, Container, Row } from "react-bootstrap";

import JobImage from "assets/images/jobImage.jpg";

import ContactSection from "./Contact/contact";
import ContentSection from "./Content/content";
import RoleSection from "./Role/role";
import ServiceSection from "./Services/index";
import TestimonialSection from "./Testimonials/index";

const Homepage = ({ logout }) => {
  return (
    <Container fluid="md">
      <Row>
        <Col xs={12} md={6}>
          <ContentSection />
        </Col>
        <Col xs={12} md={6}>
          <img src={JobImage} alt="login" className="w-100" />
        </Col>
      </Row>
      <Row>
        {JSON.parse(localStorage.getItem("user"))?.role !== "Admin" && (
          <RoleSection logout={logout} />
        )}
        <TestimonialSection />
        <ServiceSection />
        <ContactSection />
      </Row>
    </Container>
  );
};

export default Homepage;
