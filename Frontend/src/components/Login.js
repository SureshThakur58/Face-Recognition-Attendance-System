import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 300,
    margin: "20px auto",
    borderRadius: 50,
    backgroundColor: "transparent", 
    boxShadow: "0 9px 9px rgb(251, 255, 0)",
  };
  const avtarStyle = { backgroundColor: "#4CAF50" };
  const textFieldStyle = { margin: "9px" ,
    backgroundColor:"transparent"
  };

  const linkStyle = { 
    marginLeft: "auto", 
    fontSize: "0.8em" ,
    color:"black",
  };

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:5000/api/login", values) // Replace with your backend URL
      .then((response) => {
        console.log("Login Success:", response.data);
        // Store the JWT token in localStorage/sessionStorage if needed
        localStorage.setItem("token", response.data.token);
        resetForm(); // Reset form after successful login
        navigate("/home"); // Navigate to the home page
      })
      .catch((error) => {
        console.error("Login Error:", error.response?.data || error.message);
        alert(
          error.response?.data?.message || "An error occurred. Please try again."
        );
      });
  };

  return (
    <Box>
      <Paper elevation={20} style={paperStyle}>
        <Box align="center">
          <Avatar style={avtarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  style={textFieldStyle}
                  id="loginemail"
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  fullWidth
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red", fontSize: "0.8em" }}
                />

                <Field
                  as={TextField}
                  style={textFieldStyle}
                  id="outlined-password-input"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red", fontSize: "0.8em" }}
                />

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <FormControlLabel
                    control={<Checkbox name="rememberMe" color="primary" />}
                    label="Remember me"
                  />
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    style={linkStyle}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  style={{ marginTop: "20px" }}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
}
