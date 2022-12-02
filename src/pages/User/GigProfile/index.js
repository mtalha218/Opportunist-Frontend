import {
  Button,
  Checkbox,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

import { getRequest } from "services/apiClient";
import { gigById } from "api/Gigs";
import CommentCard from "components/CommentCard";
import { UseLoadingHook } from "hooks";

const packageInfo = {
  packageName: "",
  packageDescription: "",
  packageDeliveryTime: "",
  noOfPages: "",
  designCustomization: false,
  contentUpload: false,
  responsiveDesign: false,
  includeSourceCode: false,
  revisions: "",
  finalPrice: "",
};

const InitialValues = {
  title: "",
  ownerId: {},
  description: "",
  category: "",
  eTags: [],
  basic: packageInfo,
  standard: packageInfo,
  premium: packageInfo,
  images: [],
  videos: [],
  documents: [],
  reviews: [],
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProfileGig = () => {
  const jobId = useParams();
  const navigate = useNavigate();
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const [initialValues, setInitalValues] = useState(InitialValues);
  const [hasLiked, setHasLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    handleJob();
    setRole(localStorage.getItem("role"));
  }, []);

  const handleJob = async () => {
    const withJWT = true;
    enableLoading();
    try {
      const {
        data: { gig },
      } = await getRequest(gigById(jobId.id), withJWT);
      const {
        title = "",
        description = "",
        category = "",
        eTags = [],
        basic = packageInfo,
        standard = packageInfo,
        premium = packageInfo,
        images = [],
        videos = [],
        documents = [],
        ownerId = {},
        reviews = [],
      } = gig;
      setInitalValues({
        title,
        description,
        category,
        eTags,
        basic,
        standard,
        premium,
        images,
        videos,
        documents,
        ownerId,
        reviews,
      });
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };
  const naviagteToChat = () => {
    navigate(`/user/buyer-chat/${initialValues.ownerId.username}`);
  };

  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <Row>
              <Col>
                <h3>{initialValues.title}</h3>
              </Col>
              <Col>
                <h4 className="mt-1">About the Seller</h4>
                <Grid container md={12} spacing={2} className="p-3">
                  <Grid item md={3} xs={4}>
                    <img
                      src={initialValues.ownerId.profileImg}
                      alt="Avatar"
                      className="avatar"
                    ></img>
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <h5 className="d-flex justify-content-center align-item-center mt-2">
                      {initialValues.ownerId.username}
                    </h5>
                  </Grid>
                </Grid>
                {role === "Buyer" && (
                  <Button
                    variant="contained"
                    className="  p-3  mb-3"
                    onClick={naviagteToChat}
                  >
                    Contact Me
                  </Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <h4 className="mt-1">About the Gig</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: initialValues.description,
                  }}
                ></div>
              </Col>
              <Col>
                {" "}
                <h4>Gallery</h4>
                <img src={initialValues.images[0]} alt="" className="w-50" />
                <video controls poster="/images/w3html5.gif" className="w-75">
                  <source src={initialValues.videos[0]} type="video/mp4" />
                </video>
              </Col>
            </Row>
            {/* <Grid container xs={12}> */}
            {/* <Grid item md={6} className="p-3"> */}
            {isEmpty(initialValues.reviews) ? (
              <h4>No Reviews Yet</h4>
            ) : (
              <>
                <h5 className="mt-1 mb-2">Reviews</h5>
                <Grid container spacing={2}>
                  {initialValues.reviews.map((review) => (
                    <Grid xs={12} md={4} item>
                      <div key={review._id} className="border rounded p-2 mb-1">
                        <CommentCard
                          image={review.reviewer.profileImg}
                          firstName={review.reviewer.firstName}
                          lastName={review.reviewer.lastName}
                          comment={review.comment}
                          rating={review.rating}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            {/* </Grid> */}
            <div>
              <h4>Services</h4>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Service Type</StyledTableCell>
                    <StyledTableCell>Basic</StyledTableCell>
                    <StyledTableCell>Standard</StyledTableCell>
                    <StyledTableCell>premium</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Package Name
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.basic.packageName}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.standard.packageName}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.premium.packageName}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Description
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.basic.packageDescription}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.standard.packageDescription}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.premium.packageDescription}{" "}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Delivery
                    </StyledTableCell>
                    <StyledTableCell>
                      {initialValues.basic.packageDeliveryTime}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.standard.packageDeliveryTime}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.premium.packageDeliveryTime}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Number of Pages
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.basic.noOfPages}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.standard.noOfPages}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.premium.noOfPages}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Design customization
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="basic.designCustomization"
                        checked={initialValues.basic.designCustomization}
                        // onChange={handleChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="standard.designCustomization"
                        checked={initialValues.standard.designCustomization}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="preniium.designCustomization"
                        checked={initialValues.premium.designCustomization}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Content upload
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="basic.contentUpload"
                        checked={initialValues.basic.contentUpload}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="standard.contentUpload"
                        checked={initialValues.standard.contentUpload}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="preniium.contentUpload"
                        checked={initialValues.premium.contentUpload}
                      />
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Responsive design
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="basic.responsiveDesign"
                        checked={initialValues.basic.responsiveDesign}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="standard.responsiveDesign"
                        checked={initialValues.standard.responsiveDesign}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="premium.responsiveDesign"
                        checked={initialValues.premium.responsiveDesign}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Include source code
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="basic.includeSourceCode"
                        checked={initialValues.basic.includeSourceCode}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="standard.includeSourceCode"
                        checked={initialValues.standard.includeSourceCode}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        name="premium.includeSourceCode"
                        checked={initialValues.premium.includeSourceCode}
                      />
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      Revisions
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.basic.revisions}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.standard.revisions}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {initialValues.premium.revisions}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow

                  // sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <TableCell component="th" scope="row">
                      Final Price
                    </TableCell>
                    <TableCell> {initialValues.basic.finalPrice}</TableCell>
                    <TableCell> {initialValues.standard.finalPrice}</TableCell>
                    <TableCell> {initialValues.premium.finalPrice}</TableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileGig;
