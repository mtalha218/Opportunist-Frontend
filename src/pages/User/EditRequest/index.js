import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

import BuyerForm from "./form";

import { getRequestByID, editRequestByID } from "api/Buyers";

import { UseLoadingHook } from "hooks";
import { getRequest, putRequest } from "services/apiClient";

const InitialValues = {
  title: "",
  description: "",
  deliveryTime: "",
  price: "",
  attchment: "",
  category: "",
};

const EditRequest = () => {
  const id = useParams();
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [initialValues, setInitalValues] = useState(InitialValues);

  const handleRequest = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { buyerRequest },
      } = await getRequest(getRequestByID(id.id), withJWT);
      const {
        title = "",
        description = "",
        deliveryTime = "",
        price = "",
        attchment = "",
        category = "",
      } = buyerRequest;
      setInitalValues({
        title,
        description,
        deliveryTime,
        price,
        attchment,
        category,
      });
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleUpdate = async (values) => {
    const withJWT = true;

    enableLoading();
    try {
      await putRequest(editRequestByID(id.id), values, withJWT);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log("submitted values: ", values);
      handleUpdate(values);
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
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditRequest;
