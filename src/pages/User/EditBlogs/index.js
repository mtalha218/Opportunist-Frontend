import { Button, Grid, TextField } from "@mui/material";
import { editBlogByID, getBlogByID } from "api/Blog";
import { UseLoadingHook } from "hooks";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { postRequest, getRequest, putRequest } from "services/apiClient";
import Swal from "sweetalert2";

function EditBlogs() {
  const id = useParams();
  const [value, setValue] = useState("");
  console.log(id);
  const [title, setTitle] = useState("");
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();
  const handleJob = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { blog },
      } = await getRequest(getBlogByID(id.id), withJWT);
      setTitle(blog.title);
      setValue(blog.description);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBlogs = async () => {
    const withJWT = true;
    enableLoading();
    const values = {
      title: title,
      description: value,
    };
    let data;
    try {
      data = await putRequest(editBlogByID(id.id), values, withJWT);
      disableLoading();
      Swal.fire({
        text: data.data.message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/user/viewBlogs");
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

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          {" "}
          <h4>Add Your Blogs</h4>
          <hr />
          <TextField
            controlId="title"
            label="Blog Title"
            className="mb-3 w-100"
            type="text"
            placeholder=" Title of Blog"
            name="title"
            value={title}
            onChange={handleTitle}
          />
          <h5>Briefly Describe Your Gig</h5>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="mb-3"
          />
          <Button
            variant="contained"
            style={{ marginLeft: "0.5rem" }}
            className=" w-100 p-3  mb-3"
            onClick={handleBlogs}
          >
            Post Request{" "}
            {isLoading && <Spinner animation="border" role="status" />}
          </Button>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
}
export default EditBlogs;
