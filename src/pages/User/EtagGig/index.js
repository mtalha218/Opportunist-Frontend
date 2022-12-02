import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

import { searchByEtag } from "api/Gigs";
import { UseLoadingHook } from "hooks";
import { postRequest } from "services/apiClient";

import "./index.scss";
import { isEmpty } from "lodash";
import NotFoundError from "components/NotFoundError";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const AllGigs = () => {
  const etag = useParams();
  const navigate = useNavigate();
  const { enableLoading, disableLoading } = UseLoadingHook();

  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setID] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const [description, setDesc] = useState("");
  const [profleImage, setProfileimage] = useState("");

  const naviagteToDetail = (id) => {
    navigate(`/user/details/${id}`);
  };

  const handleJob = async (values) => {
    const withJWT = true;
    const value = {
      eTag: etag.id,
    };
    enableLoading();
    try {
      const {
        data: {
          data: { gigs },
        },
      } = await postRequest(searchByEtag(), value, withJWT);
      console.log(gigs);
      setJobs(gigs);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  useEffect(() => {
    handleJob();
  }, [etag]);

  const handleShow = (id) => {
    setShow(true);
    setID(id);
  };
  const showDescription = (id) => {
    setShowDesc(true);
    setDesc(id);
  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    console.log(image);
    setProfileimage(image);
  };

  return (
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
  );
};

export default AllGigs;
