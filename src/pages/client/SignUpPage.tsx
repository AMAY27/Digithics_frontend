import {
  Box,
  Button,
  Container,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { UserRegistrationCredentials } from "../../types";
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

const StyledSelect = styled(Select)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.white}`,
  "&:hover": {
    borderColor: theme.palette.common.white,
    borderWidth: 2,
  },
  "&.Mui-focused": {
    borderColor: theme.palette.common.white,
    borderWidth: 2,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
  },
  "& .MuiSelect-icon": {
    color: theme.palette.common.white,
  },
}));

const initialValues: UserRegistrationCredentials = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "Client",
  subscription: "Three_Months",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  email: Yup.string()
    .required("This field is required")
    .email("Please enter proper email format. ex: user@example.com"),
  password: Yup.string().required("This field is required"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { signUpUser } = authContext;

  const handleSubmit = async (
    values: UserRegistrationCredentials
  ): Promise<void> => {
    const signupSuccess = await signUpUser(values);
    if (signupSuccess) {
      toast.success("Your Account has been created. Please login to continue.");
      navigate("/signin");
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
          xs={false}
          md={8}
          sx={(theme) => ({
            background: `url(${process.env.PUBLIC_URL}/assets/signIn1.svg) no-repeat`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          })}
        />
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
            overflow: "auto",
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
              Sign up to the Client Portal
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Box display="flex" flexDirection="column">
                        <FormLabel
                          required
                          sx={{
                            color: (theme) => theme.palette.secondary.light,
                            lineHeight: "1.75em",
                          }}
                          error={touched.firstName && Boolean(errors.firstName)}
                        >
                          First Name
                        </FormLabel>
                        <Field
                          as={StyledTextField}
                          name="firstName"
                          className="form-input"
                          fullWidth
                          required
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={
                            touched.firstName &&
                            Boolean(errors.firstName) &&
                            errors.firstName
                          }
                          sx={{ mb: 2 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box display="flex" flexDirection="column">
                        <FormLabel
                          required
                          sx={{
                            color: (theme) => theme.palette.secondary.light,
                            lineHeight: "1.75em",
                          }}
                          error={touched.lastName && Boolean(errors.lastName)}
                        >
                          Last Name
                        </FormLabel>
                        <Field
                          as={StyledTextField}
                          name="lastName"
                          className="form-input"
                          fullWidth
                          required
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={
                            touched.lastName &&
                            Boolean(errors.lastName) &&
                            errors.lastName
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
                      <Box display="flex" flexDirection="column">
                        <FormLabel
                          required
                          sx={{
                            color: (theme) => theme.palette.secondary.light,
                            lineHeight: "1.75em",
                          }}
                          error={
                            touched.subscription && Boolean(errors.subscription)
                          }
                        >
                          Subscription
                        </FormLabel>
                        <Field
                          as={StyledSelect}
                          name="subscription"
                          className="form-input"
                          fullWidth
                          required
                          sx={{ mb: 2 }}
                        >
                          <MenuItem value="Three_Months">3 Months</MenuItem>
                          <MenuItem value="Six_Months">6 Months</MenuItem>
                          <MenuItem value="Twelve_Months">12 Months</MenuItem>
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" fullWidth variant="contained">
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <Link to="/signin">
                        <Typography
                          variant="subtitle1"
                          component="span"
                          color="primary"
                        >
                          Already have an account? Sign In
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
