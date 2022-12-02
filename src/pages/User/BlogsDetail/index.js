import { Box, Button, Container, Grid } from "@mui/material";
import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { isEmpty } from "lodash";
import { getBlogByID, review } from "api/Blog";
import { getRequest, postRequest } from "services/apiClient";

import "react-quill/dist/quill.snow.css";
import "./index.css";
import CommentCard from "components/CommentCard";

const Blogs = () => {
  const id = useParams();
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlog = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: {
          blog: { description, reviews, title },
          hasLiked,
        },
      } = await getRequest(getBlogByID(id.id), withJWT);
      setDescription(description);
      setHasLiked(hasLiked);
      setTitle(title);
      setReviews(reviews);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitReview = async () => {
    const data = {
      comment: message,
      blogId: id.id,
    };
    const withJWT = true;
    setIsSubmitting(true);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const {
        data: {
          data: { review: Review },
          message,
        },
      } = await postRequest(review(), data, withJWT);
      const newReview = {};
      newReview.reviewer = {
        profileImg: user?.profileImg,
        firstName: user?.firstName,
        lastName: user?.lastName,
      };
      newReview.comment = Review?.comment;
      newReview._id = Review?._id;
      setReviews([...reviews, newReview]);
      setMessage("");
      Swal.fire({
        text: message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
    }
  };
  return (
    <Container fluid="md" spacing={2} className="p-3">
      <h4 className="text-center bg-light py-5 px-3">{title}</h4>

      <div
        className="py-4"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <Grid container xs={12}>
        <Grid item md={6} className="p-3">
          {isEmpty(reviews) ? (
            <h4>No Reviews Yet</h4>
          ) : (
            <>
              <h5 className="mt-1 mb-2">Reviews</h5>
              {reviews.map((review) => (
                <div key={review._id} className="border rounded p-2 mb-1">
                  <CommentCard
                    image={review.reviewer.profileImg}
                    firstName={review.reviewer.firstName}
                    lastName={review.reviewer.lastName}
                    comment={review.comment}
                  />
                </div>
              ))}
            </>
          )}
        </Grid>
        <Grid item md={6} className="p-3">
          <h4>Add Review</h4>
          <textarea
            className="form-control mb-2 p-3"
            rows="8"
            placeholder="MESSAGE"
            name="message"
            value={message}
            required
            onChange={(event) => {
              console.log("value: ", event.target.value);
              setMessage(event.target.value);
            }}
          ></textarea>

          <Button
            variant="contained"
            type="button"
            className="d-flex justify-content-center align-items-center align-self-center w-25 p-3"
            onClick={submitReview}
          >
            SEND {isSubmitting && <Spinner animation="border" role="status" />}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Blogs;
