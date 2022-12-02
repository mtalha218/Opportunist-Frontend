import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";

import { allBlog, like } from "api/Blog";
import { UseLoadingHook } from "hooks";
import { getRequest, postRequest } from "services/apiClient";

import "react-quill/dist/quill.snow.css";
import "./index.css";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const naviagteToDetail = (id) => {
    navigate(`/blogs/details/${id}`);
  };

  const handleJob = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { blogs },
      } = await getRequest(allBlog(), withJWT);
      setBlogs(blogs);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleJob();
  }, []);

  const handleLike = async ({ blogId, isLiked }) => {
    if (isLiked) return;
    const withJWT = true;
    const value = {};
    enableLoading();
    try {
      await postRequest(like(blogId), value, withJWT);
      const newBlogs = [];
      for (let blog of blogs) {
        if (blog._id === blogId) {
          blog.likes.push(JSON.parse(localStorage.getItem("user"))?._id);
          blog.hasLiked = true;
        }
        newBlogs.push(blog);
      }
      setBlogs(newBlogs);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  return isLoading ? (
    <div className="d-flex justify-content-center w-100 h-100 align-items-center">
      <p>Fetching Blogs... Please wait</p>
    </div>
  ) : !blogs ? (
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
    <Container fluid={"md"}>
      <h4 className="mb-5">Blogs</h4>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid blog xs={12}>
            <div className="card">
              <div className="card-header">
                <img
                  src="https://www.bypeople.com/wp-content/uploads/2015/05/css-gradient-background.png"
                  alt="rover"
                  style={{ height: "100px" }}
                />
                <h4 className="centered">{blog.title}</h4>
              </div>
              <div className="card-body">
                <span className="tag tag-teal yourbtn">Technology</span>
                <Box
                  component="div"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                  }}
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                ></Box>
                <div className="d-flex w-100 align-items-center justify-content-between pt-3">
                  <p
                    onClick={() => naviagteToDetail(blog._id)}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                  >
                    Learn More &nbsp;
                    <ArrowRightAltIcon />
                  </p>
                  <p
                    onClick={() =>
                      handleLike({ blogId: blog._id, isLiked: blog.hasLiked })
                    }
                  >
                    {blog.hasLiked ? (
                      <FavoriteIcon
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    ) : (
                      <FavoriteBorderIcon style={{ cursor: "pointer" }} />
                    )}
                    <span style={{ fontSize: "16px" }}>
                      {blog.likes.length}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;
