import { React } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";

import { FloatingInput } from "components";

const ProfileForm = ({
  errors,
  handleChange,
  handleSubmit,
  values,
  handleBlur,
  isLoading,
  userRole,
  // handleResume,
  // profleResume,
  handleCompany,
}) => {
  return (
    <>
      <Container fluid="md">
        <Form onSubmit={handleSubmit}>
          <FloatingInput
            controlId="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.firstName}
          />
          <FloatingInput
            controlId="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.lastName}
          />
          <FloatingInput
            controlId="username"
            label="Username"
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.username}
          />
          <FloatingInput
            controlId="email"
            label="Email address"
            type="email"
            name="email"
            value={values.email}
            placeholder="name@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.email}
          />

          <FloatingInput
            controlId="dateOfBirth"
            label="Date Of Birth"
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.dateOfBirth}
          />
          <FloatingInput
            controlId="phone"
            label="Phone"
            type="text"
            placeholder="Phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.phone}
          />
          {/* {userRole === "Job Seeker" && (
            <>
              {" "}
              <h5>Upload CV</h5>
              {profleResume && <img src={profleResume} alt="login" />}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={handleResume}
                  accept="application/pdf"
                />
              </Form.Group>
            </>
          )} */}

          <Button
            variant="primary"
            type="submit"
            className="d-flex justify-content-center align-items-center align-self-center w-100 p-3"
          >
            Edit Profile{" "}
            {isLoading && <Spinner animation="border" role="status" />}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ProfileForm;
