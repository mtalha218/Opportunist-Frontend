import { useFormik } from "formik";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

import { signup } from "api/Auth";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { UseLoadingHook } from "hooks";
import { postRequest } from "services/apiClient";
import { registerSchema } from "utils/validationSchema";
const SignupForm = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    dateOfBirth: "",
    role: "",
    // profileImg: "",
    // isBuyer: true,
  };

  const handleRegister = async (values) => {
    console.log(values);

    const withJWT = false;
    enableLoading();
    try {
      await postRequest(signup(), values, withJWT);
      disableLoading();
      navigate("/auth/login");
    } catch (e) {
      disableLoading();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={formik.handleChange}
                  errorText={formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  errorText={formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  autoComplete="username"
                  name="username"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  errorText={formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  onChange={formik.handleChange}
                  errorText={formik.errors.dateOfBirth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  onChange={formik.handleChange}
                  errorText={formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3 h-100"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option>Choose Role</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </Form.Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up{" "}
              {isLoading && <Spinner animation="border" role="status" />}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </>
  );
};

export default SignupForm;
