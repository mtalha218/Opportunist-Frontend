import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { forgetPassword } from "api/Auth";
import { useFormik } from "formik";
import { Spinner } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { UseLoadingHook } from "hooks";
import { postRequest } from "services/apiClient";
import { forgetSchema } from "utils/validationSchema";

const theme = createTheme();

const ForgetPassword = () => {
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();

  const initialValues = {
    email: "",
  };

  const handleForgetPassword = (values) => {
    console.log("Submitted Values: ", values);
    const withJWT = false;
    enableLoading();
    try {
      postRequest(forgetPassword(), values, withJWT);
      disableLoading();
    } catch (e) {
      disableLoading();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgetSchema,
    onSubmit: (values) => {
      handleForgetPassword(values);
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
            Forget Password!
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="name@example.com"
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <span className="text-danger mb-2">{formik.errors.email}</span>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit{" "}
              {isLoading && (
                <Spinner animation="border" role="status"></Spinner>
              )}
            </Button>
          </Box>
          <Grid item>
            <Link href="/auth/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgetPassword;
