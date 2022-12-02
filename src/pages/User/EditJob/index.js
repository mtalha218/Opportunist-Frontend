import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import ProfileForm from "./form";

import { editJobByID, getJobByID } from "api/Jobs";

import { UseLoadingHook } from "hooks";
import { getRequest, putRequest } from "services/apiClient";

const InitialValues = {
  title: "",
  description: "",
  salary: "",
};

const Profile = () => {
  const jobId = useParams();
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [initialValues, setInitalValues] = useState(InitialValues);
  console.log(jobId.id);
  const handleJob = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { job },
      } = await getRequest(getJobByID(jobId.id), withJWT);
      const { title = "", description = "", salary = "" } = job;
      setInitalValues({
        title,
        description,
        salary,
      });
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleProfile = async (values) => {
    const withJWT = true;

    enableLoading();
    try {
      await putRequest(editJobByID(jobId.id), values, withJWT);
      Swal.fire({
        text: "Job Edited Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
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
      handleProfile(values);
    },
  });

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <ProfileForm
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

export default Profile;
