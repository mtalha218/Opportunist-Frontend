import * as React from "react";

import { Box, Button, Step, StepButton, Stepper } from "@mui/material";
import { createGig } from "api/Gigs";
import { useFormik } from "formik";
import Swal from "sweetalert2";

import { UseLoadingHook } from "hooks";
import { useState } from "react";
import { postRequest } from "services/apiClient";
import Step1 from "./Step1/index";
import Step2 from "./Step2/index";
import Step3 from "./Step3/index";
import Step4 from "./Step4/index";
import { useNavigate } from "react-router";
import { useEffect } from "react";
const steps = ["Overview", "Pricing", "Description & FAQ", "Gallery"];
let etagArray = [];
let imagesTemp = [];
let imagesTemp1 = [];
let documentTemp = [];
let documentTemp1 = [];
let videoTemp = [];
let videoTemp1 = [];
export default function Gig() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [value, setValue] = useState("");
  const packageInfo = {
    packageName: "",
    packageDescription: "",
    packageDeliveryTime: "",
    noOfPages: "",
    designCustomization: false,
    contentUpload: false,
    responsiveDesign: false,
    includeSourceCode: false,
    revisions: "",
    finalPrice: "",
  };

  const InitialValues = {
    title: "",
    description: "",
    category: "",
    eTags: [],
    basic: packageInfo,
    standard: packageInfo,
    prenium: packageInfo,
    images: [],
    videos: [],
    documents: [],
  };
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();
  const [etag, setEtag] = useState("");
  const [etagsArray, setEtagArray] = useState([]);
  const [imagesArray, setImageArray] = useState([]);
  const [documentsArray, setDocumentArray] = useState([]);
  const [videoArray, setVideoAray] = useState([]);
  const [tempImage, setTempImage] = useState([]);
  const [tempVideo, setTempVideo] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleJob = async (values) => {
    const withJWT = true;
    values.description = value;
    values.eTags = etagsArray;
    values.images = imagesArray;
    values.videos = videoArray;
    values.documents = documentsArray;
    const gig = new FormData();

    gig.append("title", values.title);
    gig.append("description", values.description);
    gig.append("category", values.category);
    // gig.append("eTags", values.eTags);
    gig.append("eTags", etagsArray);
    // etagsArray.forEach((item) => {

    // });
    gig.append("basic", JSON.stringify(values.basic));
    gig.append("standard", JSON.stringify(values.standard));
    gig.append("premium", JSON.stringify(values.prenium));
    imagesArray.forEach((item, index) => {
      gig.append("images", item[index]);
    });
    videoArray.forEach((item, index) => {
      gig.append("videos", item[index]);
    });
    // for (const item of imagesArray) {
    //   console.log(item.);
    //   gig.append("images", item);
    // }
    // for (const item of videoArray) {
    //   gig.append("videos", item);
    // }

    // });
    // videoArray.forEach((item) => {
    //   gig.append("videos", item);
    // });

    enableLoading();
    let data;
    try {
      data = await postRequest(createGig(), gig, withJWT);
      disableLoading();
      Swal.fire({
        text: data.data.message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });

      // navigate("/user/gig");
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
  const handleComplete = (values) => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleJob(values);
  };
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: InitialValues,
    onSubmit: (values) => {
      console.log("submitted values: ", values);
      handleComplete(values);
    },
  });

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleEtag = (event) => {
    if (event.target.value) {
      setEtag(event.target.value);
    }
  };
  const uploadMultipleFiles = (e) => {
    imagesTemp.push(e.target.files);
    for (let i = 0; i < imagesTemp[0].length; i++) {
      imagesTemp1.push(URL.createObjectURL(imagesTemp[0][i]));
    }
    setImageArray(imagesTemp);
    setTempImage(imagesTemp1);
    setUpdate(!update);

    // this.setState({ file: this.fileArray })
  };
  const uploadMultipleVideos = (e) => {
    videoTemp.push(e.target.files);
    for (let i = 0; i < videoTemp[0].length; i++) {
      videoTemp1.push(URL.createObjectURL(videoTemp[0][i]));
    }
    setVideoAray(videoTemp);
    setTempVideo(videoTemp1);
    setUpdate(!update);
    // this.setState({ file: this.fileArray })
  };
  const uploadMultipleDocument = (e) => {
    documentTemp.push(e.target.files);
    for (let i = 0; i < documentTemp[0].length; i++) {
      documentTemp1.push(URL.createObjectURL(documentTemp[0][i]));
    }
    setDocumentArray(documentTemp);

    // this.setState({ file: this.fileArray })
  };
  const handleDeleteImage = (id) => {
    console.log(id);
    // const index = imagesTemp.indexOf(id);

    imagesTemp.splice(id, 1);
    imagesTemp1.splice(id, 1);
    console.log(imagesTemp);
    setImageArray(imagesTemp);
    setUpdate(!update);
    setTempImage(imagesTemp1);
  };
  const handleDeleteVideo = (id) => {
    // const index = videoTemp.indexOf(id);
    // if (index > -1) {
    videoTemp.splice(id, 1);
    videoTemp1.splice(id, 1);
    setVideoAray(videoTemp);
    setTempVideo(videoTemp1);
    setUpdate(!update);
  };
  const addEtag = () => {
    if (etag !== "") {
      etagArray.push(etag);
    }

    setEtagArray(etagArray);
    setEtag("");
  };

  useEffect(() => {}, [update]);
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep} className="p-2">
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className="mt-5">
        <React.Fragment>
          {activeStep === 0 ? (
            <Step1
              handleSubmit={formik.handleSubmit}
              errors={formik.errors}
              values={formik.values}
              isLoading={isLoading}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              handleEtag={handleEtag}
              addEtag={addEtag}
              etagArray={etagsArray}
            />
          ) : activeStep === 1 ? (
            <Step2
              handleSubmit={formik.handleSubmit}
              errors={formik.errors}
              values={formik.values}
              isLoading={isLoading}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
          ) : activeStep === 2 ? (
            <Step3
              handleSubmit={formik.handleSubmit}
              errors={formik.errors}
              values={formik.values}
              isLoading={isLoading}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              setValue={setValue}
              value={value}
            />
          ) : activeStep === 3 ? (
            <Step4
              imagesTemp={imagesArray}
              documentsArray={documentsArray}
              videoArray={videoArray}
              imagesTemp1={tempImage}
              videoTemp1={tempVideo}
              documentTemp1={documentTemp1}
              handleDeleteVideo={handleDeleteVideo}
              handleDeleteImage={handleDeleteImage}
              uploadMultipleFiles={uploadMultipleFiles}
              uploadMultipleVideos={uploadMultipleVideos}
              uploadMultipleDocument={uploadMultipleDocument}
            />
          ) : (
            ""
          )}
          {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography> */}
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2 }}
            className="mb-4"
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {console.log(activeStep)}
            {totalSteps() === activeStep + 1 ? (
              <Button
                // type="submit"
                onClick={formik.handleSubmit}
                sx={{ mr: 1 }}
                disabled={imagesArray.length > 0 ? false : true}
              >
                Publish
              </Button>
            ) : (
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      </div>
    </Box>
  );
}
