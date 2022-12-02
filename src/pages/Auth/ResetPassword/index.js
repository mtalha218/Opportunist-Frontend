import { Col, Container, Row } from "react-bootstrap";

import loginImage from "assets/images/login.jpg";

import { Header } from "components";
import ResetPassForm from "./form";

const ResetPassword = () => {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col xs={12} md={6}>
            <img src={loginImage} alt="login" />
          </Col>
          <Col xs={12} md={6}>
            <Header>Reset Passowrd</Header>
            <ResetPassForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
