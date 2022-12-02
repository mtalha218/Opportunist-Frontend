import { Button, Grid } from "@mui/material";
import { isEmpty } from "lodash";
import { allRequests } from "api/Buyers";
import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getRequest } from "services/apiClient";
import "./index.scss";
import NotFoundError from "components/NotFoundError";

const BuyerRequest = () => {
  const { enableLoading, disableLoading } = UseLoadingHook();

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { buyerRequests },
      } = await getRequest(allRequests(), withJWT);
      console.log(buyerRequests);
      setJobs(buyerRequests);
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

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    navigate(`/user/responseRequest/${id}`);
  };
  const handleOffer = (buyerId) => {
    navigate(`/user/customerOffer/${buyerId}`);
  };
  const [description, setDesc] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const handleCloseDcsc = () => setShowDesc(false);

  const showDescription = (id) => {
    setShowDesc(true);
    setDesc(id);
  };
  return (
    <>
      {isEmpty(jobs) ? (
        <NotFoundError />
      ) : (
        <Container fluid="md" className="mb-2">
          <Grid container spacing={2}>
            {jobs?.map((item, index) => (
              <Grid key={item._id} item xs={12} sm={6} lg={4}>
                <div className="post1">
                  <div className="header_post">
                    <img src={item?.buyer?.profileImg} alt="" />
                  </div>

                  <div className="body_post">
                    <div className="post_content">
                      <h1>{item?.title}</h1>
                      <p>
                        {item.description.slice(0, 30)}&nbsp;
                        {item.description.length > 30 && (
                          <span
                            onClick={() => showDescription(item.description)}
                          >
                            Read More
                          </span>
                        )}
                      </p>
                      <p>
                        <strong>Category:</strong> {item.category}
                      </p>

                      <div className="container_info">
                        <div className="postedBy">
                          <span>Buyer</span>
                          <p>{item.buyer?.lastName}</p>
                        </div>

                        <div className="container_tags">
                          <span>Price</span>
                          <p className="tags">{item.price} PKR</p>
                        </div>
                        <div className="container_tags">
                          <span>Delivery Time</span>
                          <p className="tags">{item.deliveryTime} days</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="contained"
                          onClick={() => handleShow(item._id)}
                        >
                          Send Request
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleOffer(item.buyer._id)}
                        >
                          Custom Offer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
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

export default BuyerRequest;
