import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Modal, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { isEmpty } from "lodash";

import jobImage from "assets/images/job.jfif";

import { UseLoadingHook } from "hooks";
import { applyJob, jobsApi, searchJob } from "api/Jobs";
import { getRequest, postRequest } from "services/apiClient";

import NotFoundError from "components/NotFoundError";

import "./index.scss";

const options = [
  "Islamabad",
  "RawalPindi",
  "Karachi",
  "Lahore",
  "Peshawar",
  "Multan",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Jobs = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setID] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const [description, setDesc] = useState("");
  const [profleImage, setProfileimage] = useState("");

  const fetchJobs = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { jobs },
      } = await postRequest(jobsApi(), { location, title }, withJWT);
      setJobs(jobs);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleClose = () => setShow(false);
  const handleCloseDcsc = () => setShowDesc(false);

  const handleShow = (id) => {
    setShow(true);
    setID(id);
  };
  const showDescription = (id) => {
    setShowDesc(true);
    setDesc(id);
  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    console.log(image);
    setProfileimage(image);
  };

  const SearchJobs = async () => {
    fetchJobs();
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const withJWT = true;
    const data = new FormData();
    console.log(id);
    data.append("resume", profleImage);
    data.append("_jobId", id);
    try {
      postRequest(applyJob(), data, withJWT);
      Swal.fire({
        text: "Job Applied Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      setIsSubmitting(false);
      setShow(false);
    } catch (e) {
      setIsSubmitting(false);
    }
  };

  const handleSearch = (e) => {
    setTitle(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <>
      <Container fluid="md" className="mb-2">
        <>
          <Grid container spacing={2} className="mb-3">
            <Grid item xs={5}>
              <FormControl sx={{ m: 1, width: "100%" }} className="w-100">
                <TextField
                  controlId="title"
                  label="Job Title"
                  className="mb-3"
                  type="text"
                  placeholder="Job Title"
                  name="title"
                  value={title}
                  onChange={handleSearch}
                />
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <FormControl sx={{ m: 1, width: "100%" }} className="w-100">
                <InputLabel id="demo-multiple-name-label">Location</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="location"
                  className="mb-3"
                  value={location}
                  onChange={handleLocation}
                  input={<OutlinedInput label="Category" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem key={""} value={""}>
                    Select Location
                  </MenuItem>
                  {options.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <div className="d-flex justify-content-center p-3">
                <Button variant="contained" onClick={SearchJobs}>
                  Search Jobs
                </Button>
              </div>
            </Grid>
          </Grid>
          {isLoading ? (
            <div className="d-flex flex-column w-100 align-items-center justify-content-center mt-5">
              <Spinner animation="border" role="status" />
              <p>Fetching Jobs, Please wait!</p>
            </div>
          ) : isEmpty(jobs) ? (
            <NotFoundError />
          ) : (
            <Grid container spacing={2}>
              {jobs?.map((item, index) => (
                <Grid item xs={12} sm={6} md={4}>
                  <div className="post">
                    <div className="header_post">
                      <img src={jobImage} alt="" className="w-100" />
                    </div>

                    <div className="body_post2">
                      <div className="post_content2">
                        <h1>{item.title}</h1>
                        <div className="d-flex flex-column">
                          <h2 className="subHeading">Description</h2>
                          <p>
                            {item.description.slice(0, 50)}&nbsp;
                            {item.description.length > 50 && (
                              <span
                                onClick={() =>
                                  showDescription(item.description)
                                }
                              >
                                Read More
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                          <h2 className="subHeading">Company Name: </h2>
                          <p> {item.companyId.companyName}</p>
                        </div>

                        <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                          <h2 className="subHeading">Apply at: </h2>
                          <p> {item.companyId.companyEmail}</p>
                        </div>

                        <div className="d-flex justify-content-between gap-2">
                          <div className="d-flex justify-content-between align-items-center gap-2">
                            <h2 className="subHeading">Location: </h2>
                            <p>{item.location}</p>
                          </div>
                        </div>

                        <div className="d-flex flex-column">
                          <p>
                            <strong>Address: </strong> &nbsp;
                            {item.companyId.companyAddress}{" "}
                          </p>
                        </div>

                        <div className="container_infos gap-2">
                          <div className="container_tags">
                            <span className="text-center">Job Type</span>
                            <div className="tags"> {item.jobType}</div>
                          </div>
                          <div className="container_tags">
                            <span className="text-center">Salary / Month</span>
                            <div className="tags">PKR {item.salary}</div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                          <Button
                            variant="contained"
                            disabled={item.hasApplied ? true : false}
                            onClick={() => handleShow(item._id)}
                          >
                            {item.hasApplied ? "Applied" : "Apply Job"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      </Container>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            id="outlined-multiline-flexible"
            type="file"
            onChange={handleImage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{ marginRight: 10 }}
          >
            Close
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Upload CV &nbsp;
            {isSubmitting && <Spinner animation="border" role="status" />}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDesc} onHide={handleCloseDcsc} centered>
        <Modal.Header closeButton>
          <Modal.Title>Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            onClick={handleCloseDcsc}
            style={{ marginRight: 10 }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Jobs;
