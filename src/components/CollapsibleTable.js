import { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import UserInfoCard from "./UserInfoCard";

const Row = ({ row, index, handleShow }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{index}</TableCell>
        <TableCell align="left">
          <UserInfoCard
            image={row.sellerId.profileImg}
            fullName={`${row.sellerId.firstName} ${row.sellerId.lastName}`}
          />
        </TableCell>
        <TableCell align="left">{row.buyerId.title}</TableCell>
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">PKR {row.price}</TableCell>
        <TableCell align="left">{row.deliveryTime} days</TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            onClick={() => handleShow(row.sellerId.username)}
          >
            Chat{" "}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow className="bg-light">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Buyer Request
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Buyer</TableCell>
                    <TableCell align="left">Project Title</TableCell>
                    <TableCell align="left">Buyer Description</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Delivery Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <UserInfoCard
                        image={row.buyerId.buyer.profileImg}
                        fullName={`${row.buyerId.buyer.firstName} ${row.buyerId.buyer.lastName}`}
                      />
                    </TableCell>
                    <TableCell align="left">{row.buyerId.title}</TableCell>
                    <TableCell align="left">
                      {row.buyerId.description}
                    </TableCell>
                    <TableCell align="left">PKR {row.buyerId.price}</TableCell>
                    <TableCell align="left">
                      {row.buyerId.deliveryTime} days
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const CollapsibleTable = ({ counterOffers, handleShow }) => {
  console.log("counterOffer: ", counterOffers);
  return (
    <TableContainer component={Paper}>
      <TableContainer aria-label="collapsible table">
        <Box sx={{ margin: 1 }}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className="px-3"
          >
            Counter Offers
          </Typography>
        </Box>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Seller</TableCell>
            <TableCell align="left">Request Title</TableCell>
            <TableCell align="left">Seller Description</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Delivery Time</TableCell>
            <TableCell align="left">Chat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {counterOffers.map((counterOffer, index) => {
            return (
              counterOffer?.buyerId && (
                <Row
                  index={index + 1}
                  key={counterOffer._id}
                  row={counterOffer}
                  handleShow={handleShow}
                />
              )
            );
          })}
        </TableBody>
      </TableContainer>
    </TableContainer>
  );
};

export default CollapsibleTable;
