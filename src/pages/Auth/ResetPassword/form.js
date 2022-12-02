import { useFormik } from "formik";
import { Button, Container, Form, Spinner } from "react-bootstrap";

import { FloatingInput } from "components";

import { resetPassword } from "api/Auth";
import { UseLoadingHook } from "hooks";
import { postRequest } from "services/apiClient";
import { resetSchema } from "utils/validationSchema";
const ResetPassForm = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  console.log(token);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleResetPassword = (values) => {
    console.log("Submitted Values: ", values);
    const withJWT = false;
    const data = {
      newPassword: values.password,
      token: token,
    };
    enableLoading();
    try {
      postRequest(resetPassword(), data, withJWT);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetSchema,
    onSubmit: (values) => {
      handleResetPassword(values);
    },
  });

  return (
    <>
      <Container fluid="md">
        <Form onSubmit={formik.handleSubmit}>
          <FloatingInput
            controlId=""
            label="Password"
            type="password"
            name="password"
            placeholder="password"
            onChange={formik.handleChange}
            errorText={formik.errors.password}
          />
          <FloatingInput
            controlId=""
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="name@example.com"
            onChange={formik.handleChange}
            errorText={formik.errors.confirmPassword}
          />
          <Button
            variant="primary"
            type="submit"
            className="d-flex justify-content-center align-items-center align-self-center w-100 p-3"
          >
            Reset Passowrd
            {isLoading && <Spinner animation="border" role="status"></Spinner>}
          </Button>{" "}
        </Form>
      </Container>
    </>
  );
};

export default ResetPassForm;
