import { Button, Col, Container, Row } from "react-bootstrap";

import { FloatingInput } from "components";

const ContentSection = () => {
  return (
    <>
      <Container fluid="md" className="mb-3">
        <h3>Find Your Dream Job in one place </h3>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.{" "}
        </p>
        <FloatingInput
          controlId=""
          label="Find the Job ----"
          type="text"
          name="search"
          placeholder="search"
          // onChange={handleChange}
          // errorText={errors.dateOfBirth}
        />
        <Row>
          <Col md={3}>
            {" "}
            <Button
              variant="primary"
              type="submit"
              className="d-flex justify-content-center align-items-center align-self-center w-100 p-3 mb-3"
            >
              Find Now{" "}
            </Button>
          </Col>
          <Col md={3}>
            <Button
              variant="primary"
              type="submit"
              className="d-flex justify-content-center align-items-center align-self-center w-100 p-3"
            >
              Talk To Us{" "}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContentSection;
