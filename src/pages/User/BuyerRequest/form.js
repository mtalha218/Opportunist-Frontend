import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Button,
} from "@mui/material";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { categories } from "../../../utils/dummydata";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const BuyerForm = ({
  errors,
  handleChange,
  handleSubmit,
  values,
  handleBlur,
  isLoading,
  hasCompanyData,
}) => {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <h2>Post Offer Here</h2>
            <Form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, width: "100%" }} className="w-100">
                <TextField
                  controlId="title"
                  label="Request Title"
                  className="mb-3"
                  type="text"
                  placeholder="Job Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && (
                  <span className="text-danger">{errors.title}</span>
                )}
                <TextField
                  controlId="projectDescription"
                  label="Tell us about the Project"
                  type="text"
                  className="mb-3"
                  name="description"
                  placeholder="project Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.description}
                />
                {errors.description && (
                  <span className="text-danger">{errors.description}</span>
                )}
                <TextField
                  controlId="price"
                  label="Price"
                  type="number"
                  className="mb-3"
                  name="price"
                  value={values.price}
                  placeholder="Budget"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.price}
                />
                {errors.price && (
                  <span className="text-danger">{errors.price}</span>
                )}
                <TextField
                  controlId="delivery"
                  label="Delivery Time"
                  type="number"
                  name="deliveryTime"
                  value={values.deliveryTime}
                  placeholder="Delivery Time  in days"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.deliveryTime}
                />
                {errors.deliveryTime && (
                  <span className="text-danger">{errors.deliveryTime}</span>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} className="w-100">
                <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="category"
                  className="mb-3"
                  // value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {categories.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <span className="text-danger">{errors.category}</span>
                )}
                {/* <TextField
                  id="outlined-multiline-flexible"
                  type="file"
                  className="mb-2 w-100"

                  // eslint-disable-next-line no-restricted-globals
                  // onChange={() => handleMessage(event.target.value)}
                /> */}
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                style={{ marginLeft: "0.5rem" }}
                className=" w-100 p-3  mb-3"
              >
                Post Request{" "}
                {isLoading && <Spinner animation="border" role="status" />}
              </Button>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default BuyerForm;
