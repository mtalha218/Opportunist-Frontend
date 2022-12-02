import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { StreamChat } from "stream-chat";

import { UseLoadingHook, UseAuthentication } from "hooks";

import { signin } from "api/Auth";
import { postRequest } from "services/apiClient";
import { loginSchema } from "utils/validationSchema";

const client = new StreamChat(process.env.REACT_APP_CHAT_API_KEY);
// open the WebSocket connection to start receiving events
const Login = () => {
  const { setAuthToken, storeUser } = UseAuthentication();
  const { isLoading, enableLoading, disableLoading } = UseLoadingHook();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    enableLoading();
    try {
      const {
        data: {
          data: { token, user },
          message,
        },
      } = await postRequest(signin(), values);
      setAuthToken(token);
      storeUser(user);
      localStorage.setItem("role", user.role);
      if (user.role === "Seller") {
        await client.connectUser(
          {
            id: user?.username,
            name: user?.username,
            image: user?.profileImg,
          },
          client.devToken(user?.username)
        );
      }
      Swal.fire({
        text: message,
        icon: "success",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      window.location = "/user/dashboard";
      disableLoading();
    } catch (e) {
      Swal.fire({
        text: e.response.data.message,
        icon: "error",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
      });
      disableLoading();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://media.istockphoto.com/photos/business-people-using-digital-tablet-planning-start-up-project-ideas-picture-id1325566034?b=1&k=20&m=1325566034&s=170667a&w=0&h=LPjTIULli8Pwn-v-QvhgRTGOi_Jw9LWmb4T91-fV5Gk=)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Password"
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <span className="text-danger mb-2">
                  {formik.errors.password}
                </span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In{" "}
                {isLoading && (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/auth/forget-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
