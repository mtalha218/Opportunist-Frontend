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
  hasCompanyData,
}) => {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <h2>Post Ad Here</h2>
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
                type="number"
                name="salary"
                value={values.salary}
                placeholder="Salary"
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.salary}
              />
              <FloatingInput
                controlId="jobLocation"
                label="Job Location"
                type="text"
                name="location"
                value={values.location}
                placeholder="job Location"
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.location}
              />
              <Form.Select
                aria-label="Default select example"
                className="mb-3 h-100"
                value={values.jobType}
                name="jobType"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </Form.Select>

              {/*            
              {hasCompanyData && (
                <>
                  <FloatingInput
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
                    type="email"
                    placeholder="Comapany Email"
                    name="companyEmail"
                    value={values.companyEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.companyEmail}
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
                  />
                </>
              )} */}
              <Button
                variant="primary"
                type="submit"
                className="d-flex justify-content-center align-items-center align-self-center w-100 p-3 mb-3"
              >
                Post Job{" "}
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
