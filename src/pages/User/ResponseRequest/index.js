import { useFormik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

import Swal from "sweetalert2";
import BuyerForm from "./form";

import { allGig } from "api/Gigs";
import { createOffer } from "api/Seller";

import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "services/apiClient";
import { ResponseSchema } from "utils/validationSchema";

const InitialValues = {
  gig: "",
  description: "",
  deliveryTime: "",
  price: "",
  revision: "",
  buyerId: "",
  sellerId: "",
};

const ResponsePost = () => {
  const id = useParams();
  const navigate = useNavigate();
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const handleJob = async (values) => {
    const withJWT = true;
    values.buyerId = id.id;
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    values.sellerId = user._id;
    enableLoading();
    let data;
    try {
      data = await postRequest(createOffer(), values, withJWT);
      disableLoading();
      Swal.fire({
        text: data.data.message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/user/requests");
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
  const [hasGigData, setHasGigData] = useState([]);
  const handleHasCompany = async () => {
    const withJWT = true;

    try {
      const { data: gigs } = await getRequest(allGig(), withJWT);
      console.log(gigs);
      setHasGigData(gigs.gigs);
    } catch (e) {}
  };
  useEffect(() => {
    handleHasCompany();
  }, []);
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: InitialValues,
    validationSchema: ResponseSchema,
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
              hasGigData={hasGigData}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResponsePost;
