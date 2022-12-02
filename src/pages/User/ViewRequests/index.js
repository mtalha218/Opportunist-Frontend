import {
  Table,
  TableBody,
  TableCell,
  Button,
  TableHead,
  TableRow,
} from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import { ownRequests, deleteofferByID } from "api/Buyers";

import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { DeleteRequest, getRequest } from "services/apiClient";

const RequestsView = () => {
  const navigate = useNavigate();
  const { enableLoading, disableLoading } = UseLoadingHook();
  const [jobs, setJobs] = useState([]);

  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { buyerRequests },
      } = await getRequest(ownRequests(), withJWT);
      console.log("s", buyerRequests);
      setJobs(buyerRequests);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  useEffect(() => {
    handleJob();
  }, []);

  useEffect(() => {}, [jobs]);

  const navigateToEdit = (id) => {
    navigate(`/user/editRequests/${id}`);
  };

  const deleteJob = ({ id, index }) => {
    console.log(id, index);
    Swal.fire({
      title: "Do you want to Delete the Job?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const withJWT = true;
        try {
          await DeleteRequest(deleteofferByID(id), withJWT);
          const newJobs = jobs.filter((job) => job._id !== id);
          setJobs(newJobs);
        } catch (e) {}
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const navigateToCreate = () => {
    navigate("/user/postRequest");
  };
  return (
    <>
      <Container fluid="md">
        <div className="d-flex justify-content-end">
          <Button
            variant="contained"
            onClick={() => navigateToCreate()}
            className="mb-3"
          >
            Post Request Offer
          </Button>
        </div>
        <Row>
          <Col>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Request Title</TableCell>
                  <TableCell>Project Description</TableCell>

                  <TableCell>Price</TableCell>
                  <TableCell>Delivery Time</TableCell>
                  <TableCell>Category</TableCell>

                  <TableCell>Actions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs?.map((job, index) => (
                  <TableRow key={job._id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell> {job.title}</TableCell>

                    <TableCell> {job.description}</TableCell>
                    <TableCell>{job.price}</TableCell>

                    <TableCell>{job.deliveryTime} Days</TableCell>
                    <TableCell>{job.category}</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => navigateToEdit(job._id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => deleteJob({ id: job._id, index })}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RequestsView;
