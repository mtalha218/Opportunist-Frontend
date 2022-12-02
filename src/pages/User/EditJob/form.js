import { React } from "react";
import { Button, Container, Form, Spinner, Row, Col } from "react-bootstrap";

import { FloatingInput } from "components";

const JobForm = ({
  errors,
  handleChange,
  handleSubmit,
  values,
  handleBlur,
  isLoading,
}) => {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <h2>Edit Ad Here</h2>
            <Form onSubmit={handleSubmit}>
              <FloatingInput
                controlId="title"
                label="Job Title"
                type="text"
                placeholder="Job Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.title}
              />
              {/* <FloatingInput
                controlId="location"
                label="Location"
                type="text"
                placeholder="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.location}
              /> */}
              <FloatingInput
                controlId="description"
                label="Description"
                type="text"
                name="description"
                placeholder="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.description}
              />
              <FloatingInput
                controlId="salary"
                label="Salary"
                type="text"
                name="salary"
                value={values.salary}
                placeholder="Salary"
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.salary}
              />

              {/* <FloatingInput
                controlId="companyName"
                label="Company Name"
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={values.companyName}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.companyName}
              />
              <FloatingInput
                controlId="comapanyEmail"
                label="Comapany Email"
                type="text"
                placeholder="Comapany Email"
                name="comapanyEmail"
                value={values.comapanyEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.comapanyEmail}
              />

              <FloatingInput
                controlId="companyWebsite"
                label="Company Website"
                type="text"
                name="companyWebsite"
                value={values.companyWebsite}
                placeholder="Company Website"
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.companyWebsite}
              />
              <FloatingInput
                controlId="companyAddress"
                label="Company Address"
                type="text"
                name="companyAddress"
                value={values.companyAddress}
                placeholder="Company Address"
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.companyAddress}
              /> */}
              <Button
                variant="primary"
                type="submit"
                className="d-flex justify-content-center align-items-center align-self-center w-100 p-3 mb-3"
              >
                Edit Job{" "}
                {isLoading && <Spinner animation="border" role="status" />}
              </Button>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default JobForm;
