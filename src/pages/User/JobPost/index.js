import { useFormik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import JobForm from "./form";

import { hasCompanyCheck, job } from "api/Jobs";

import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "services/apiClient";

const InitialValues = {
  title: "",
  description: "",
  salary: "",
  jobType: "",
  location: "",
  companyName: "",
  companyEmail: "",
  companyWebsite: "",
  companyAddress: "",
};

const JobPost = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();

  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      await postRequest(job(), values, withJWT);
      Swal.fire({
        text: "Job Added Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      disableLoading();
      navigate("/user/viewjob");
    } catch (e) {
      disableLoading();
    }
  };
  const [hasCompanyData, setHasCompanyData] = useState(false);
  const handleHasCompany = async () => {
    const withJWT = true;

    try {
      const { data: hasCompany } = await getRequest(hasCompanyCheck(), withJWT);
      console.log(hasCompany);
      setHasCompanyData(hasCompany);
      console.log(hasCompany.hasCompany);
      if (!hasCompany.hasCompany) {
        Swal.fire({
          title: "Please Register Your Company First",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Go To Profile",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            navigate("/user/profile/");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
    } catch (e) {}
  };
  useEffect(() => {
    handleHasCompany();
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: InitialValues,
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
            <JobForm
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

export default JobPost;
