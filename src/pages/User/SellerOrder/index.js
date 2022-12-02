import { useEffect, useState } from "react";
import { Container, Modal, Spinner } from "react-bootstrap";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { getRequest, postRequest } from "services/apiClient";
import Swal from "sweetalert2";
import { isEmpty } from "lodash";

import { completeOrderSeller, sellerOrder } from "api/Order";
import NotFoundError from "components/NotFoundError";
import { UseLoadingHook } from "hooks";

import "./index.scss";

const SellerOrder = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [link, setLink] = useState("");

  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { sellerOrders },
      } = await getRequest(sellerOrder(), withJWT);
      console.log(sellerOrders);
      setJobs(sellerOrders);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  useEffect(() => {
    handleJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFile = (event) => {
    console.log("f", event.target.files[0]);
    setFile(event.target.files[0]);
  };
  const handleOrder = async () => {
    const withJWT = true;

    // const data = {
    //   orderId: id,
    //   sourceFileDetail: message,
    //   status: "Pending",
    // };
    const data = new FormData();
    console.log(file);
    data.append("orderId", id);
    data.append("sourceFileDetail", message);
    data.append("sourceLink", link);
    data.append("status", "Pending");
    data.append("sourceFile", file);
    try {
      enableLoading();
      const {
        data: { message },
      } = await postRequest(completeOrderSeller(), data, withJWT);
      disableLoading();
      Swal.fire({
        text: message,
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
  const navigateToEdit = (id) => {
    navigate(`/user/editjob/${id}`);
  };
  return (
    <>
      <Container fluid="md" className="mb-2">
        {isEmpty(jobs) ? (
          <NotFoundError />
        ) : (
          <Grid container spacing={2}>
            {jobs?.map((item, index) => (
              <Grid key={item._id} item md={4} xs={12}>
                <div className="post">
                  <div className="header_post">
                    <img src={item.buyerId?.profileImg} alt="" />
                  </div>

                  <div className="body_post1">
                    <div className="post_content1">
                      <div className="container_infos">
                        <div className="postedBy">
                          <span>Status</span>
                          {item.status}
                        </div>

                        <div className="container_tags">
                          <span>Price</span>
                          <div className="tags">PKR {item.price}</div>
                        </div>
                        <div className="container_tags">
                          <span>Delivery Time</span>
                          <div className="tags">{item.deliveryTime} days</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="contained"
                          onClick={() => handleShow(item._id)}
                          disabled={
                            item.status === "In Progress" ? false : true
                          }
                        >
                          {item.status === "Pending"
                            ? "Pending"
                            : item.status === "Completed"
                            ? "Completed"
                            : "Complete Order"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ height: "250px", overflowY: "auto", padding: "0 25px" }}
        >
          <h5>Upload Source File</h5>
          <TextField
            id="outlined-multiline-flexible"
            type="file"
            className="mb-3 w-100"
            placeholder=""
            // eslint-disable-next-line no-restricted-globals
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
            // onChange={handleFile}
          />
          <h5>Project Detail</h5>
          <TextField
            id="outlined-multiline-flexible"
            type="text"
            className="mb-3 w-100"
            placeholder=""
            multiline
            rows={4}
            // eslint-disable-next-line no-restricted-globals
            onChange={() => setMessage(event.target.value)}
          />
          <h5>Upload Repository Link </h5>
          <TextField
            id="outlined-multiline-flexible"
            type="text"
            className="mb-3 w-100"
            placeholder=""
            // eslint-disable-next-line no-restricted-globals
            onChange={() => setLink(event.target.value)}
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
          <Button variant="contained" onClick={handleOrder}>
            Complete {isLoading && <Spinner animation="border" role="status" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SellerOrder;
