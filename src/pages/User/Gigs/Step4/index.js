import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import "./index.css";

function Step4({
  imagesTemp,
  documentsArray,
  videoArray,
  imagesTemp1,
  videoTemp1,
  documentTemp1,
  uploadMultipleFiles,
  uploadMultipleVideos,
  uploadMultipleDocument,
  handleDeleteImage,
  handleDeleteVideo,
}) {
  const [value, setValue] = useState("");

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          {" "}
          <h2>Showcase Your Services In A Gig Gallery</h2>
          <h4>Upload Images 1 Only</h4>
          <div className="form-group multi-preview mb-3">
            <Row>
              {(imagesTemp1 || []).map((url, index) => (
                <Col md={3} xs={12}>
                  <div className="img-wraps mb-3">
                    <span
                      className="closes"
                      title="Delete"
                      onClick={() => handleDeleteImage(index)}
                    >
                      ×
                    </span>

                    <img className="img-responsive" src={url} alt="..." />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          {imagesTemp.length < 1 && (
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={uploadMultipleFiles}
            />
          )}
          <h4>Upload One Videos</h4>
          <div className="form-group multi-preview mb-3">
            <Row>
              {(videoTemp1 || []).map((url, index) => (
                <Col md={3} xs={12}>
                  <div class="img-wraps mb-3">
                    <span
                      class="closes"
                      title="Delete"
                      onClick={() => handleDeleteVideo(index)}
                    >
                      ×
                    </span>
                    <video controls poster="/images/w3html5.gif">
                      <source src={url} type="video/mp4" />
                    </video>
                    {/* <img class="img-responsive" src={url} alt="..." /> */}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          {videoArray.length < 1 && (
            <input
              type="file"
              className="form-control"
              onChange={uploadMultipleVideos}
              accept="video/*"
            />
          )}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
}
export default Step4;
