import { Container, Modal, Spinner } from "react-bootstrap";

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Button,
} from "@mui/material";

import Swal from "sweetalert2";

import { getAllQuestion, replyQustion } from "api/Contact";
import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "services/apiClient";

const Queries = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  const [queries, setQueries] = useState([]);
  const handleQueries = async () => {
    const withJWT = false;
    enableLoading();
    try {
      const {
        data: { questions },
      } = await getRequest(getAllQuestion(), withJWT);
      console.log(questions);
      setQueries(questions);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [message, setMessage] = useState("");

  const handleMessage = (value) => {
    setMessage(value);
  };

  const sendReply = async () => {
    const withJWT = true;
    const values = {
      questionId: id,
      answer: message,
    };
    setShow(true);
    try {
      enableLoading();
      const {
        data: { message },
      } = await postRequest(replyQustion(), values, withJWT);
      Swal.fire({
        text: message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      const updatedQueries = [];
      for (let query of queries) {
        if (query._id === id) {
          query.isResponded = true;
        }
        updatedQueries.push(query);
      }
      setQueries(updatedQueries);

      disableLoading();
      setShow(false);
    } catch (e) {
      Swal.fire({
        text: e.response.data.message,
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });

      disableLoading();
    }
  };
  return (
    <>
      <Container fluid="md">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>

              <TableCell>Message</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>{item.email}</TableCell>
                {/* <TableCell>{item.location}</TableCell> */}

                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.message}</TableCell>

                <TableCell>
                  {item.isResponded ? (
                    <TableCell>Replied</TableCell>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleShow(item._id)}
                    >
                      Reply{" "}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Response Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control mb-2"
            rows="10"
            placeholder="MESSAGE"
            name="message"
            required
            onChange={(event) => handleMessage(event.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={sendReply}>
            Save Changes{" "}
            {isLoading && <Spinner animation="border" role="status" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Queries;
