import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

import { blog } from "api/Blog";
import { UseLoadingHook } from "hooks";
import { postRequest } from "services/apiClient";
import { useNavigate } from "react-router";

function AddBlogs() {
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const handleBlogs = async () => {
    const withJWT = true;
    enableLoading();
    const values = {
      title: title,
      description: value,
    };
    let data;
    try {
      data = await postRequest(blog(), values, withJWT);
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
      <Grid container spacing={2} className="p-3">
        <Grid item xs={5}>
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
            // value={title}
            onChange={handleTitle}
          />
          <h5>Describe</h5>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="mb-3"
          />
          <Button variant="contained" className="" onClick={handleBlogs}>
            Post Request{" "}
            {isLoading && <Spinner animation="border" role="status" />}
          </Button>
        </Grid>
        <Grid xs={1} style={{ borderRight: "2px solid #ddd" }}></Grid>
        <Grid item xs={6}>
          <h4>Preview</h4>
          <div
            className="wrapper"
            dangerouslySetInnerHTML={{ __html: value }}
          ></div>
        </Grid>
      </Grid>
    </>
  );
}
export default AddBlogs;
