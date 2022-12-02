import { Col, Row } from "react-bootstrap";
import "./index.css";
function Footer() {
  return (
    <div className="ml-5 mr-5 mb-0 mt-3 bg-dark text-white p-3 text-center footer">
      <Row>
        <Col>
          <div>Term and Conditions</div>
        </Col>
        <Col>
          {" "}
          <div>2021 Copyright Reserved</div>
        </Col>{" "}
        <Col>
          {" "}
          <div> ™ Trademark license agreement - Intellectual property</div>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
