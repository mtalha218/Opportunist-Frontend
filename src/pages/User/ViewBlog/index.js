import { Col, Container, Row } from "react-bootstrap";

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import { allBlog, deleteBlogByID, getMyBlogs } from "api/Blog";

import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { DeleteRequest, getRequest } from "services/apiClient";

const BlogView = () => {
  const { enableLoading, disableLoading } = UseLoadingHook();

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchMyBlogs = async (values) => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { blogs },
      } = await getRequest(getMyBlogs(), withJWT);
      console.log(blogs);
      setBlogs(blogs);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const navigateToEdit = (id) => {
    navigate(`/user/editblog/${id}`);
  };

  const navigateToUsers = (id) => {
    navigate(`/user/appliedUser/${id}`);
  };

  const deleteBlog = ({ blogId, index }) => {
    Swal.fire({
      title: "Do you want to Delete the Job?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const withJWT = true;
        try {
          await DeleteRequest(deleteBlogByID(blogId), withJWT);
          const remainingBlogs = blogs.filter((blog) => blog._id !== blogId);
          setBlogs(remainingBlogs);
        } catch (e) {}
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const navigateToCreate = () => {
    navigate("/user/addBlogs");
  };
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={5}></Col>
          <Col md={5}></Col>
          <Col md={2}>
            {" "}
            <Button
              variant="contained"
              onClick={() => navigateToCreate()}
              className="mb-3"
            >
              Add Blog
            </Button>
          </Col>
        </Row>
        {blogs.length === 0 ? (
          <center>
            <img
              src={
                "https://www.empoweredbodymindsoul.com/media/img/site-img/No-Record-Found.png"
              }
              alt="not found"
            />
          </center>
        ) : (
          <Row>
            <Col>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell> Title</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs?.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell> {item.title}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => navigateToEdit(item._id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() =>
                            deleteBlog({ blogId: item._id, index })
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default BlogView;
