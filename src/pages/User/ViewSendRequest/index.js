import { Container } from "react-bootstrap";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { allRequestsSeller } from "api/Buyers";
import { UseLoadingHook } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getRequest } from "services/apiClient";
import CollapsibleTable from "components/CollapsibleTable";

const ViewSendRequest = () => {
  const { enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();

  const handleShow = (sellerUsername) => {
    navigate(`/user/buyer-chat/${sellerUsername}`);
  };

  const [queries, setQueries] = useState([]);
  const handleQueries = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { sentRequests },
      } = await getRequest(allRequestsSeller(), withJWT);
      console.log(sentRequests);
      setQueries(sentRequests);
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
      <Container
        fluid="md"
        style={{
          overflowX: "auto",
        }}
      >
        <CollapsibleTable counterOffers={queries} handleShow={handleShow} />
      </Container>
    </>
  );
};

export default ViewSendRequest;
