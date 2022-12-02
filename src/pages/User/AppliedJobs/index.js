import { Container, Modal } from "react-bootstrap";

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Button,
} from "@mui/material";
import moment from "moment";
import Swal from "sweetalert2";

import { appliedJob } from "api/Jobs";
import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "services/apiClient";

const AppliedJobs = () => {
  const { enableLoading, disableLoading } = UseLoadingHook();
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  const [queries, setQueries] = useState([]);
  const handleQueries = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { appliedJobs },
      } = await getRequest(appliedJob(), withJWT);
      console.log(appliedJobs);
      setQueries(appliedJobs);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container fluid="md">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>

              <TableCell>Salary</TableCell>
              <TableCell>Applied On</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>{" "}
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.salary}</TableCell>{" "}
                <TableCell>
                  {moment(item.createdAt).format("dd-MM-yyyy")}
                </TableCell>
                <TableCell>Applied</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default AppliedJobs;
