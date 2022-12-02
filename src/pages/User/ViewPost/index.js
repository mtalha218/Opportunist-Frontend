import { Col, Container, Row } from "react-bootstrap";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import {
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Table,
//   Button,
// } from "@mui/material";

import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import { allJob, deletejobByID } from "api/Jobs";

import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { DeleteRequest, getRequest } from "services/apiClient";
import { Button } from "@mui/material";

const JobView = () => {
  const { enableLoading, disableLoading } = UseLoadingHook();

  const navigate = useNavigate();
  const [company, setCompany] = useState({});
  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { company },
      } = await getRequest(allJob(), withJWT);
      console.log(company);
      setCompany(company);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  useEffect(() => {
    handleJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToEdit = (id) => {
    navigate(`/user/editjob/${id}`);
  };

  const navigateToUsers = (id) => {
    navigate(`/user/appliedUser/${id}`);
  };

  const deleteJob = ({ jobId, index }) => {
    Swal.fire({
      title: "Do you want to Delete the Job?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const withJWT = true;
        try {
          await DeleteRequest(deletejobByID(jobId), withJWT);
          const remainingJobs = [];
          for (let job of company?.jobs) {
            if (job._id !== jobId) {
              remainingJobs.push(job);
            }
          }
          company.jobs = remainingJobs;
          const deepCopyCompany = { ...company };
          deepCopyCompany.jobs = remainingJobs;
          setCompany(deepCopyCompany);
        } catch (e) {}
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <Container fluid="md">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Job Title
                </TableCell>
                <TableCell align="left" style={{ minWidth: "250px" }}>
                  Job Description
                </TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Salary
                </TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Company Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Company Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Company Website
                </TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Company Address
                </TableCell>
                <TableCell align="left" style={{ minWidth: "350px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {company?.jobs?.map((job, index) => (
                <TableRow
                  key={job?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{job?.title}</TableCell>
                  <TableCell align="left">{job?.description}</TableCell>
                  <TableCell align="left">PKR {job?.salary}</TableCell>
                  <TableCell align="left">{company?.companyEmail}</TableCell>
                  <TableCell align="left">{company?.companyName}</TableCell>
                  <TableCell align="left">{company?.companyWebsite}</TableCell>
                  <TableCell align="left">{company?.companyAddress}</TableCell>
                  <TableCell align="left">
                    <div className="d-flex flex-row gap-2">
                      <Button
                        variant="contained"
                        onClick={() => navigateToEdit(job?._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => deleteJob({ jobId: job?._id, index })}
                      >
                        Delete
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => navigateToUsers(job?._id)}
                      >
                        Applied Users
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Row>
          <Col>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Description</TableCell>

                  <TableCell>Salary</TableCell>
                  <TableCell>Company Email</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Company Website</TableCell>
                  <TableCell>Company Address</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs?.jobs?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell> {item.title}</TableCell>
                    {/*<TableCell></TableCell> {item.location} */}
        {/* <TableCell> {item.description}</TableCell>
                    <TableCell>{item.salary}</TableCell>
                    <TableCell>{jobs.companyName}</TableCell>
                    <TableCell>{jobs.companyEmail}</TableCell>
                    <TableCell>{jobs.companyWebsite}</TableCell>
                    <TableCell>{jobs.companyAddress}</TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        variant="contained"
                        onClick={() => navigateToEdit(item._id)}
                      >
                        Edit{" "}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        variant="contained"
                        onClick={() => deleteJob({ jobId: item._id, index })}
                      >
                        Delete{" "}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        variant="contained"
                        onClick={() => navigateToUsers(item._id)}
                      >
                        Applied Users{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        </Row> */}
      </Container>
    </>
  );
};

export default JobView;
