import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { isEmpty } from "lodash";
import { myOffer } from "api/Seller";
import { UseLoadingHook } from "hooks";
import { getRequest } from "services/apiClient";
import NotFoundError from "components/NotFoundError";

const SendOffers = () => {
  const { enableLoading, disableLoading } = UseLoadingHook();
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const handleClose = () => setShow(false);
  const [queries, setQueries] = useState([]);

  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  const handleQueries = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { sentOffers },
      } = await getRequest(myOffer(), withJWT);
      console.log(sentOffers);
      setQueries(sentOffers);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  useEffect(() => {
    handleQueries();
  }, []);

  return (
    <Container fluid="md">
      <TableContainer component={Paper}>
        <Box component={"div"} className="my-4 mx-3">
          <Typography>Sent Offers </Typography>
        </Box>
        {isEmpty(queries) ? (
          <NotFoundError />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">DeliveryTime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">PKR {row.price}</TableCell>
                  <TableCell align="left">{row.deliveryTime} days</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default SendOffers;
