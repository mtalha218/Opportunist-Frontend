import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Button,
} from "@mui/material";

const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 18;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 600,
    },
  },
};

const CustomerOfferForm = ({
  errors,
  handleChange,
  handleSubmit,
  values,
  handleBlur,
  isLoading,
  hasGigData,
}) => {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <h2>Post Your Offer Here</h2>
            <Form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, width: "100%" }} className="w-100">
                <InputLabel id="demo-multiple-name-label">Gig</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="gigId"
                  // value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Gig" />}
                  MenuProps={MenuProps}
                >
                  {hasGigData?.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  controlId="projectDescription"
                  label="Tell us about the Project"
                  type="text"
                  multiline={10}
                  name="description"
                  placeholder="description"
                  className="mb-3"
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
                  name="price"
                  value={values.price}
                  className="mb-3"
                  placeholder="Budget"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.price}
                />
                {errors.price && (
                  <span className="text-danger">{errors.price}</span>
                )}

                <TextField
                  controlId="revision"
                  label="Revision"
                  type="number"
                  name="revision"
                  className="mb-3"
                  value={values.revision}
                  placeholder="Revision"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.revision}
                />
                {errors.revision && (
                  <span className="text-danger">{errors.revision}</span>
                )}

                <TextField
                  controlId="delivery"
                  label="Delivery Time"
                  type="number"
                  className="mb-3"
                  name="deliveryTime"
                  value={values.deliveryTime}
                  placeholder="Delivery Time"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={errors.deliveryTime}
                />
                {errors.deliveryTime && (
                  <span className="text-danger">{errors.deliveryTime}</span>
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
                className="d-flex justify-content-center align-items-center align-self-center w-100 p-3 mb-3"
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

export default CustomerOfferForm;
