import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

import { FloatingInput } from "components";
import { useFormik } from "formik";
import moment from "moment";
import Swal from "sweetalert2";

import ProfileForm from "./form";

import { createCompany } from "api/Jobs";
import { profileUpdate } from "api/Users";

import { UseLoadingHook } from "hooks";
import { postRequest } from "services/apiClient";

const InitialValues = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  profileImg: "",
  username: "",
  companyName: "",
  companyEmail: "",
  // resume: "",
  companyWebsite: "",
  companyAddress: "",
  isBuyer: true,
};

const Profile = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();
  const [profleImage, setProfileimage] = useState("");
  const [profleResume, setProfleResume] = useState("");
  const [initialValues, setInitalValues] = useState(InitialValues);
  const [userRole, setUserRole] = useState("");
  const [updateProfile, setUpdateProfile] = useState(0);

  useEffect(() => {
    const img = JSON.parse(localStorage.getItem("user"));

    setUserRole(img.role);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const {
        email,
        firstName,
        lastName,
        phone,
        dateOfBirth,
        profileImg,
        username,
        isBuyer,
        resume,
      } = user;

      setInitalValues({
        email,
        firstName,
        lastName,
        phone,
        dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
        profileImg,
        username,
        isBuyer,
      });
      setProfileimage(profileImg);
      setProfleResume(resume);
    }
  }, [updateProfile]);

  const handleProfile = async (values) => {
    const withJWT = true;
    console.log(profleImage);
    values.profileImg = profleImage;
    values.resume = profleResume;
    const data = new FormData();

    data.append("email", values.email);
    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("phone", values.phone);
    data.append("dateOfBirth", values.dateOfBirth);
    data.append("profileImg", values.profileImg);
    data.append("username", values.username);
    data.append("resume", values.resume);

    console.log("submitted values: ", data);

    enableLoading();
    try {
      const {
        data: { user },
      } = await postRequest(profileUpdate(), data, withJWT);
      localStorage.setItem("user", JSON.stringify(user));
      setUpdateProfile(1);
      disableLoading();
      navigate("/user/dashboard");
      window.location.reload();
    } catch (e) {
      disableLoading();
    }
  };

  const handleCompany = async (
    companyName,
    companyEmail,
    companyWebsite,
    companyAddress
  ) => {
    const withJWT = true;
    const values = {
      companyName: companyName,
      companyEmail: companyEmail,
      companyWebsite: companyWebsite,
      companyAddress: companyAddress,
    };
    enableLoading();
    try {
      await postRequest(createCompany(), values, withJWT);
      Swal.fire({
        text: "Company Added Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      disableLoading();
      // navigate("/");
    } catch (e) {
      disableLoading();
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: (values) => {
      handleProfile(values);
    },
  });

  const handleImage = (e) => {
    const image = e.target.files[0];

    console.log(image);
    setProfileimage(image);
  };
  const handleResume = (e) => {
    const image = e.target.files[0];

    console.log(image);
    setProfleResume(image);
  };

  return (
    <>
      <Container fluid="md" className="mb-3">
        <Row>
          <Col>
            <img src={profleImage} alt="login" />
            <h5>Upload Proile Picture</h5>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                onChange={handleImage}
                accept="image/png, image/gif, image/jpeg"
              />
            </Form.Group>
          </Col>
          <Col>
            <ProfileForm
              handleSubmit={formik.handleSubmit}
              errors={formik.errors}
              values={formik.values}
              profleResume={profleResume}
              isLoading={isLoading}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              userRole={userRole}
              handleResume={handleResume}
              // handleComapny={handleComapny}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}></Col>
          <Col xs={12} md={6}>
            <div className="mt-3 mb-3">
              <Form>
                {userRole === "Employer" && (
                  <>
                    <h5>Company Information</h5>
                    <FloatingInput
                      controlId="companyName"
                      label="Company Name"
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.companyName}
                    />
                    <FloatingInput
                      controlId="comapanyEmail"
                      label="Comapany Email"
                      type="email"
                      placeholder="Comapany Email"
                      name="companyEmail"
                      value={formik.values.companyEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.companyEmail}
                    />
                    <FloatingInput
                      controlId="companyWebsite"
                      label="Company Website"
                      type="text"
                      name="companyWebsite"
                      value={formik.values.companyWebsite}
                      placeholder="Company Website"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.companyWebsite}
                    />
                    <FloatingInput
                      controlId="companyAddress"
                      label="Company Address"
                      type="text"
                      name="companyAddress"
                      value={formik.values.companyAddress}
                      placeholder="Company Address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.companyAddress}
                    />
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleCompany(
                          formik.values.companyName,
                          formik.values.companyEmail,
                          formik.values.companyWebsite,
                          formik.values.companyAddress
                        )
                      }
                      type="button"
                      className="d-flex justify-content-center align-items-center align-self-center w-100 p-3"
                    >
                      Post Company{" "}
                      {isLoading && (
                        <Spinner animation="border" role="status" />
                      )}
                    </Button>
                  </>
                )}
              </Form>
            </div>
          </Col>
          <Col xs={12} md={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
