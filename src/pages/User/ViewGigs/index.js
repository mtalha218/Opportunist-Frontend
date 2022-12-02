import { Button, Grid } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import { allMyGigs, deleteGigById } from "api/Gigs";
import NotFoundError from "components/NotFoundError";
import { UseLoadingHook } from "hooks";
import { DeleteRequest, getRequest } from "services/apiClient";

import "./index.scss";

const GigView = () => {
  const { enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const fetchMyGigs = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { gigs },
      } = await getRequest(allMyGigs(), withJWT);
      setJobs(gigs);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    fetchMyGigs();
  }, []);

  // const navigateToEdit = (id) => {
  //   navigate(`/user/editRequests/${id}`);
  // };

  const navigateToCreate = () => {
    navigate("/user/addGig");
  };
  const deleteGig = ({ id, index }) => {
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
          DeleteRequest(deleteGigById(id), withJWT);
          const remainingGigs = jobs.filter((gig) => gig._id !== id);
          setJobs(remainingGigs);
        } catch (e) {}
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const naviagteToDetail = (id) => {
    navigate(`/user/details/${id}`);
  };
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={5}></Col>
          <Col md={5}></Col>
          <Col md={2}>
            {" "}
            <Button
              variant="contained"
              onClick={() => navigateToCreate()}
              className="mb-3"
            >
              Create Gig{" "}
            </Button>
          </Col>
        </Row>
        <Container fluid="md" className="mb-2 p-3">
          {isEmpty(jobs) ? (
            <NotFoundError />
          ) : (
            <Grid container spacing={2}>
              {jobs?.map((item, index) => (
                <Grid
                  item
                  key={item._id}
                  md={4}
                  xs={12}
                  onClick={() => naviagteToDetail(item._id)}
                >
                  <div className="post">
                    <div className="header_post">
                      <img src={item.images[0]} alt="" className="w-100" />
                    </div>
                    <div className="body_post3">
                      <div className="post_content2">
                        <Grid container spacing={2}>
                          <Grid item md={3} xs={4}>
                            <img
                              src={item.ownerId.profileImg}
                              alt="Avatar"
                              className="avatar"
                            ></img>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <h5 className="d-flex justify-content-center align-item-center">
                              {item.ownerId.username}
                            </h5>
                          </Grid>
                        </Grid>
                        <h5 className="mt-1">{item.title}</h5>

                        <div className="container_infos">
                          <div className="postedBy"></div>
                          <div className="postedBy"></div>
                          <div className="postedBy">
                            <h6 style={{ float: "right" }}>
                              Starting at {item.basic.finalPrice}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Container>
    </>
  );
};

export default GigView;
