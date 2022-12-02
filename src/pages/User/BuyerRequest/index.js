import { useFormik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import BuyerForm from "./form";

import { createRequest } from "api/Buyers";

import { UseLoadingHook } from "hooks";
import { getRequest, postRequest } from "services/apiClient";
import { useEffect, useState } from "react";
import { buyerSchema } from "utils/validationSchema";

const InitialValues = {
  title: "",
  description: "",
  deliveryTime: "",
  price: "",
  attachment: "",
  category: "",
};

const BuyerPost = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();

  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    let data;
    try {
      data = await postRequest(createRequest(), values, withJWT);
      disableLoading();
      Swal.fire({
        text: data.data.message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/user/viewRequests");
    } catch (e) {
      Swal.fire({
        text: data.data.message,
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      disableLoading();
    }
  };
  const [hasCompanyData, setHasCompanyData] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: InitialValues,
    validationSchema: buyerSchema,
    onSubmit: (values) => {
      console.log("submitted values: ", values);
      handleJob(values);
    },
  });

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <BuyerForm
              handleSubmit={formik.handleSubmit}
              errors={formik.errors}
              values={formik.values}
              isLoading={isLoading}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              hasCompanyData={hasCompanyData}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BuyerPost;
