/* eslint-disable react-hooks/exhaustive-deps */

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Swal from "sweetalert2";

import { deleteUserByID, getAllUser } from "api/Users";

import { UseLoadingHook } from "hooks";
import { getRequest, putRequest } from "services/apiClient";
import moment from "moment";

const AllUsers = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const [users, setUsers] = useState([]);
  const handleUser = async () => {
    const withJWT = true;

    enableLoading();
    try {
      const {
        data: { data },
      } = await getRequest(getAllUser(), withJWT);
      setUsers(data);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);
  // const navigateToEdit = (id) => {
  //   navigate(`/user/editjob/${id}`);
  // };
  const deleteUser = (id, index) => {
    Swal.fire({
      title: "Do you want to Delete the user?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const withJWT = true;

        try {
          putRequest(deleteUserByID(id), {}, withJWT);
          users.splice(index, -1);
          setUsers(users);
        } catch (e) {}
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>D.O.B</TableCell>
                  <TableCell>Username</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((item, index) => (
                  <TableRow key={index}>
                    {" "}
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {moment(item.dateOfBirth).format("L")}
                    </TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => deleteUser(item._id, index)}
                      >
                        Delete{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllUsers;
