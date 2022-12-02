import * as React from "react";
import {
  Checkbox,
  TextField,
  TableHead,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";

const Step2 = ({
  errors,
  handleChange,
  handleSubmit,
  values,
  handleBlur,
  isLoading,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Service Type</TableCell>
            <TableCell>Basic</TableCell>
            <TableCell>Standard</TableCell>
            <TableCell>Prenium</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Package Name
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                name="basic.packageName"
                value={values.basic.packageName}
                onChange={handleChange}
                variant="outlined"
                style={{ border: "0px" }}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                name="standard.packageName"
                value={values.standard.packageName}
                onChange={handleChange}
                style={{ border: "0px" }}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                name="prenium.packageName"
                value={values.prenium.packageName}
                onChange={handleChange}
                style={{ border: "0px" }}
              />
            </TableCell>
          </TableRow>
          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Description
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="basic.packageDescription"
                value={values.basic.packageDescription}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="standard.packageDescription"
                value={values.standard.packageDescription}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="prenium.packageDescription"
                value={values.prenium.packageDescription}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Delivery
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="basic.packageDeliveryTime"
                value={values.basic.packageDeliveryTime}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="standard.packageDeliveryTime"
                value={values.standard.packageDeliveryTime}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="prenium.packageDeliveryTime"
                value={values.prenium.packageDeliveryTime}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Number of Pages
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="basic.noOfPages"
                value={values.basic.noOfPages}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="standard.noOfPages"
                value={values.standard.noOfPages}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="prenium.noOfPages"
                value={values.prenium.noOfPages}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Design customization
            </TableCell>
            <TableCell>
              <Checkbox
                name="basic.designCustomization"
                value={values.basic.designCustomization}
                onChange={handleChange}
                defaultChecked={values.basic.designCustomization}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                name="standard.designCustomization"
                value={values.standard.designCustomization}
                onChange={handleChange}
                defaultChecked={values.standard.designCustomization}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                name="preniium.designCustomization"
                value={values.prenium.designCustomization}
                onChange={handleChange}
                defaultChecked={values.prenium.designCustomization}
              />
            </TableCell>
          </TableRow>
          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Content upload
            </TableCell>
            <TableCell>
              <Checkbox
                name="basic.contentUpload"
                value={values.basic.contentUpload}
                onChange={handleChange}
                defaultChecked={values.basic.contentUpload}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                name="standard.contentUpload"
                value={values.standard.contentUpload}
                onChange={handleChange}
                defaultChecked={values.standard.contentUpload}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                name="preniium.contentUpload"
                value={values.prenium.contentUpload}
                onChange={handleChange}
                defaultChecked={values.prenium.contentUpload}
              />
            </TableCell>
          </TableRow>

          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Responsive design
            </TableCell>
            <TableCell>
              <Checkbox
                name="basic.responsiveDesign"
                value={values.basic.responsiveDesign}
                onChange={handleChange}
                defaultChecked={values.basic.responsiveDesign}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                name="standard.responsiveDesign"
                value={values.standard.responsiveDesign}
                onChange={handleChange}
                defaultChecked={values.standard.responsiveDesign}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                name="prenium.responsiveDesign"
                value={values.prenium.responsiveDesign}
                onChange={handleChange}
                defaultChecked={values.prenium.responsiveDesign}
              />
            </TableCell>
          </TableRow>
          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Include source code
            </TableCell>
            <TableCell>
              <Checkbox
                name="basic.includeSourceCode"
                value={values.basic.includeSourceCode}
                onChange={handleChange}
                defaultChecked={values.basic.includeSourceCode}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                name="standard.includeSourceCode"
                value={values.standard.includeSourceCode}
                onChange={handleChange}
                defaultChecked={values.standard.includeSourceCode}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                name="prenium.includeSourceCode"
                value={values.prenium.includeSourceCode}
                onChange={handleChange}
                defaultChecked={values.prenium.includeSourceCode}
              />
            </TableCell>
          </TableRow>

          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Revisions
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                type="number"
                variant="outlined"
                style={{ border: "0px" }}
                name="basic.revisions"
                value={values.basic.revisions}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                type="number"
                variant="outlined"
                style={{ border: "0px" }}
                name="standard.revisions"
                value={values.standard.revisions}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                type="number"
                variant="outlined"
                style={{ border: "0px" }}
                name="prenium.revisions"
                value={values.prenium.revisions}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
          <TableRow

          // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
          >
            <TableCell component="th" scope="row">
              Final Price
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                type={"number"}
                variant="outlined"
                style={{ border: "0px" }}
                name="basic.finalPrice"
                value={values.basic.finalPrice}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                label=""
                type="number"
                variant="outlined"
                style={{ border: "0px" }}
                name="standard.finalPrice"
                value={values.standard.finalPrice}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                id="outlined-basic"
                type="number"
                label=""
                variant="outlined"
                style={{ border: "0px" }}
                name="prenium.finalPrice"
                value={values.prenium.finalPrice}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Step2;
