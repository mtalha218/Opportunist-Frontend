import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Button,
} from "@mui/material";
import { Col, Container, Form, Row } from "react-bootstrap";
import { categories } from "../../../../utils/dummydata";
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
  handleEtag,
  isLoading,
  hasCompanyData,
  addEtag,
  etagArray,
}) => {
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <TextField
                id="outlined-multiline-flexible"
                type="text"
                placeholder="Gig Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.title}
                className="ml-2 w-100"
                style={{ marginLeft: "8px" }}

                // eslint-disable-next-line no-restricted-globals
                // onChange={() => handleMessage(event.target.value)}
              />

              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="category"
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
              </FormControl>
              <div className="d-flex flex-row">
                {etagArray.map((item) => (
                  <p
                    style={{
                      border: "1px solid",
                      padding: " 0.5rem",
                      background: "lightgray",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginLeft: "5px",
                    }}
                  >
                    {item}
                  </p>
                ))}
              </div>
              <Row>
                <center>
                  <h6>Add Upto five Positive keywords</h6>
                </center>
                <Col md={9}>
                  {" "}
                  <TextField
                    id="outlined-multiline-flexible"
                    type="text"
                    placeholder="Positive keywords"
                    name="etag"
                    // value={values.eTags}
                    onChange={handleEtag}
                    // onBlur={handleBlur}
                    // errorText={errors.searchTags}
                    className="ml-2 w-100"
                    style={{ marginLeft: "8px" }}

                    // eslint-disable-next-line no-restricted-globals
                    // onChange={() => handleMessage(event.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Button
                    variant="contained"
                    onClick={addEtag}
                    type="button"
                    style={{ marginLeft: "0.5rem" }}
                    className=" w-100 p-3  mb-3"
                  >
                    Add Etag
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default BuyerForm;
