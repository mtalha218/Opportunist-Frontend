import React, { useState } from "react";
import ReactQuill from "react-quill";

import Grid from "@mui/material/Grid";

import "react-quill/dist/quill.snow.css";

function Step3({
  errors,
  handleChange,
  handleSubmit,
  value,
  setValue,
  isLoading,
}) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          {" "}
          <h4>Description</h4>
          <hr />
          <ReactQuill
            theme="snow"
            name="description"
            value={value}
            onChange={setValue}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
}
export default Step3;
