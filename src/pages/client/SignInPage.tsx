import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Field, Formik, Form } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { UserCredentials } from "../../types";
import AuthContext from "../../context/AuthContext1";

const StyledTextField = styled(TextField)(({ theme }) => ({
  input: {
    backgroundColor: "transparent",
    color: "white",
  },
  label: { color: "white" },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
      borderWidth: 2,
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
}));

const initialValues: UserCredentials = {
  email: "",
  password: "",
  role: "Client",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter proper email format. ex: user@example.com")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { loginUser } = authContext;

  const handleSubmit = async (values: UserCredentials): Promise<void> => {
    const loginSuccess = await loginUser(values);
    if (loginSuccess) {
      toast.success("User Authenticated successfully");
      navigate("/client/dashboard");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        p: "0 !important",
        height: "100vh",
      }}
    >
      <Grid container height="100%">
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            height: "100vh",
            background: `linear-gradient(to right,rgb(0,15,45) 30%,rgb(0, 5, 14))`,
            color: (theme) => theme.palette.common.white,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            gap={4}
            margin={4}
            alignItems="center"
            sx={{
              my: 10,
              width: {
                xs: "auto",
                sm: "60%",
                md: "80%",
              },
            }}
          >
            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="V-tenet"
                width={64}
                height={64}
              />
            </Link>

            <Typography variant="h5" component="h1" textAlign="center">
              Sign in to the Client Portal
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box display="flex" flexDirection="column">
                        <FormLabel
                          required
                          sx={{
                            color: (theme) => theme.palette.secondary.light,
                            lineHeight: "1.75em",
                          }}
                          error={touched.email && Boolean(errors.email)}
                        >
                          Email
                        </FormLabel>

                        <Field
                          as={StyledTextField}
                          name="email"
                          type="email"
                          className="form-input"
                          fullWidth
                          required
                          error={touched.email && Boolean(errors.email)}
                          helperText={
                            touched.email &&
                            Boolean(errors.email) &&
                            errors.email
                          }
                          sx={{ mb: 2 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" flexDirection="column">
                        <FormLabel
                          required
                          sx={{
                            color: (theme) => theme.palette.secondary.light,
                            lineHeight: "1.75em",
                          }}
                          error={touched.password && Boolean(errors.password)}
                        >
                          Password
                        </FormLabel>
                        <Field
                          as={StyledTextField}
                          name="password"
                          type="password"
                          className="form-input"
                          fullWidth
                          required
                          error={touched.password && Boolean(errors.password)}
                          helperText={
                            touched.password &&
                            Boolean(errors.password) &&
                            errors.password
                          }
                          sx={{ mb: 2 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" fullWidth variant="contained">
                        Sign In
                      </Button>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <Link to="/signup">
                        <Typography
                          variant="subtitle1"
                          component="span"
                          color="primary"
                        >
                          New User? Sign Up
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Stack>
        </Grid>
        <Grid
          item
          xs={false}
          md={8}
          sx={(theme) => ({
            background: `url(${process.env.PUBLIC_URL}/assets/signIn.svg) no-repeat`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          })}
        ></Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;
