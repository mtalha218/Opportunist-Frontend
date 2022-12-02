/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-target-blank */
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import { buyerOrder, cancelOrder, completeOrder } from "api/Order";
import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { Container, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getRequest, postRequest } from "services/apiClient";
import Swal from "sweetalert2";
import { labels } from "../../../utils/dummydata";
import "./index.scss";
const BuyerOrders = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [openOne, setOpenOne] = useState(false);
  const [answer, setAnswer] = useState([]);
  const handleOpenOne = (index) => {
    const data = jobs.filter((item) => {
      if (item._id === index) {
        return item;
      }
    });
    console.log(data);
    setAnswer(data);
    setOpenOne(true);
  };
  const handleCloseOne = () => setOpenOne(false);

  const value = 3.5;
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [rating, setRating] = useState(0);
  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { buyerOrders },
      } = await getRequest(buyerOrder(), withJWT);
      console.log(buyerOrders);
      setJobs(buyerOrders);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [show, setShow] = useState(false);
  const cancel = (id) => {
    const withJWT = true;
    enableLoading();
    const data = {
      orderId: id,
    };
    try {
      postRequest(cancelOrder(), data, withJWT);
      disableLoading();
      Swal.fire({
        text: "Order Rated Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      setShow(false);
    } catch (e) {
      disableLoading();
    }
  };

  const handleOrder = () => {
    const withJWT = true;

    const data = {
      orderId: id,
      rating: rating,
      deliveryFeedback: message,
    };
    try {
      enableLoading();
      postRequest(completeOrder(), data, withJWT);
      disableLoading();
      Swal.fire({
        text: "Order Rated Successfully",
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      setShow(false);
    } catch (e) {
      disableLoading();
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  return (
    <>
      {jobs.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
          <center>
            <img
              src={
                "https://www.empoweredbodymindsoul.com/media/img/site-img/No-Record-Found.png"
              }
              alt="not found"
            />
          </center>
        </div>
      ) : (
        <Container fluid="md" className="mb-2">
          <Grid container spacing={2}>
            {jobs?.map((item, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <div className="post">
                  <div className="header_post">
                    <img src={item.sellerId?.profileImg} alt="" />
                  </div>

                  <div className="body_post1">
                    <div className="post_content1">
                      <div className="container_infos">
                        <div className="postedBy">
                          <span>Seller</span>
                          {item.sellerId?.firstName} &nbsp;{" "}
                          {item.sellerId?.lastName}
                        </div>

                        <div className="container_tags">
                          <span>Price</span>
                          <div className="tags">{item.price}</div>
                        </div>
                        <div className="container_tags">
                          <span>Delivery Time</span>
                          <div className="tags">{item.deliveryTime}</div>
                        </div>
                      </div>
                      <Typography
                        className={`border rounded p-2 ${
                          item.status === "In Progress"
                            ? "text-warning"
                            : item.status === "Completed"
                            ? "text-success"
                            : item.status === "Cancelled"
                            ? "text-danger"
                            : ""
                        }`}
                      >
                        {item.status}
                      </Typography>
                      {(item.status === "Completed" ||
                        item.status === "Pending") && (
                        <Button
                          variant="contained"
                          className="mt-1"
                          onClick={() => handleOpenOne(item._id)}
                        >
                          See Answer
                        </Button>
                      )}
                      {(item.status === "In Progress" ||
                        item.status === "Pending") && (
                        <div className="d-flex justify-content-between mt-3">
                          <Button
                            variant="contained"
                            onClick={() => handleShow(item._id)}
                            disabled={
                              item.status === "In Progress" ? true : false
                            }
                          >
                            Give Rating
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => cancel(item._id)}
                          >
                            Cancel Order
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Give Feedback</h5>
          <TextField
            id="outlined-multiline-flexible"
            type="text"
            className="mb-3 w-100"
            placeholder="Write your thoughts here..."
            onChange={(event) => setMessage(event.target.value)}
          />
          <h5>Give Rating</h5>
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="text-feedback"
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {/* <Box sx={{ ml: 2 }}>{labels[value]}</Box> */}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{ marginRight: 10 }}
          >
            Close
          </Button>
          <Button variant="contained" onClick={handleOrder}>
            Complete Order{" "}
            {isLoading && <Spinner animation="border" role="status" />}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={openOne} onHide={handleCloseOne} centered>
        <Modal.Body>
          {answer.length > 0 && (
            <Box>
              {answer[0].sourceFile !== "" && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Source File
                  </Typography>

                  <a
                    href={answer[0].sourceFile}
                    target="_blank"
                    style={{ color: "blue" }}
                  >
                    {" "}
                    See Attachment
                  </a>
                </>
              )}
              {answer[0].sourceFileDetail !== "" && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Project Description
                  </Typography>
                  <p>{answer[0].sourceFileDetail}</p>
                </>
              )}
              {answer[0].sourceLink !== "" && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Project Link
                  </Typography>
                  <a
                    href={answer[0].sourceLink}
                    target="_blank"
                    style={{ color: "blue" }}
                  >
                    {answer[0].sourceLink}
                  </a>
                </>
              )}
            </Box>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BuyerOrders;
