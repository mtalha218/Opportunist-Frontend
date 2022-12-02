import { useFormik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import BuyerForm from "./form";

import { job, hasCompanyCheck } from "api/Jobs";

import { UseLoadingHook } from "hooks";
import { getRequest, postRequest } from "services/apiClient";
import { useEffect, useState } from "react";

const BuyerPost = ({
  errors,
  handleChange,
  handleSubmit,
  values,
  handleBlur,
  isLoading,
  handleEtag,
  addEtag,
  etagArray,
}) => {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <BuyerForm
              handleSubmit={handleSubmit}
              errors={errors}
              values={values}
              isLoading={isLoading}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleEtag={handleEtag}
              addEtag={addEtag}
              etagArray={etagArray}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BuyerPost;
