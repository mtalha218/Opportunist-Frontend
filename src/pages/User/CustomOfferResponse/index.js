import { Container } from "react-bootstrap";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import Swal from "sweetalert2";
import { acceptOffers } from "api/Buyers";
import { myCustomoffer } from "api/Seller";
import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "services/apiClient";

const BuyerResponse = () => {
  const { enableLoading, disableLoading } = UseLoadingHook();
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [queries, setQueries] = useState([]);

  const handleClose = () => setShow(false);

  const handleAccept = async ({ id, accept, reject }) => {
    setId(id);

    const withJWT = true;
    const values = {
      isAccepted: accept,
      isRejected: reject,
      customOfferId: id,
    };
    enableLoading();
    let data;
    try {
      data = await postRequest(acceptOffers(), values, withJWT);
      console.log(data);
      const remainingCustomOffer = queries.filter((offer) => offer._id !== id);
      setQueries(remainingCustomOffer);
      Swal.fire({
        text: data.data.message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      disableLoading();
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

  const handleQueries = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { customOffers },
      } = await getRequest(myCustomoffer(), withJWT);
      console.log(customOffers);
      setQueries(customOffers);
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
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>

              <TableCell>Delivery Time</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>{item.description}</TableCell>
                {/* <TableCell>{item.location}</TableCell> */}

                <TableCell>{item.price}</TableCell>
                <TableCell>{item.deliveryTime}</TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleAccept({
                        id: item._id,
                        accept: true,
                        reject: false,
                      })
                    }
                  >
                    Accept
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleAccept({
                        id: item._id,
                        accept: false,
                        reject: true,
                      })
                    }
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default BuyerResponse;
