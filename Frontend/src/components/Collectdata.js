import React, { useState } from "react";
import {
  Avatar,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Collectdata({ mystyle }) {
  const paperStyle = {
    padding: "30px 20px",
    width: "300px",
    margin: "20px auto",
    borderRadius: 50,
    backgroundColor: "transparent",
    boxShadow: "0 9px 9px rgb(255, 0, 0)",
    ...mystyle,
  };
  const avatarStyle = { backgroundColor: "#4CAF50" };
  const textFieldSx = {
    margin: "10px 0",
    "& .MuiInputBase-root": { color: "white", ...mystyle },
    "& .MuiInputLabel-root": { color: "white", ...mystyle },
  };

  const initialValues = {
    fullname: "",
    rollno: "",
    department: "",
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().min(3).required("Full Name is required"),
    rollno: Yup.number()
      .typeError("Roll number must be a number")
      .integer("Roll number must be an integer")
      .positive("Roll number must be a positive number")
      .test(
        "is-in-range",
        "Roll number must be a 6-digit number within the range 211400–211450.",
        (value) => value >= 211401 && value <= 211450
      )
      .required("Roll number is required"),
    department: Yup.string().required("Department is required")
    .oneOf(["BEIT","beit"], "Must be BEIT Only"),
  });

  const [buttonClicked, setButtonClicked] = useState("");

  const handleFormSubmission = async (values, { resetForm }) => {
    if (buttonClicked === "takeImage") {
      console.log("Take Image Button Clicked");
      alert("Image captured and saved to backend!");
      // Add API logic for capturing and saving image
    } else if (buttonClicked === "saveData") {
      console.log("Save Data Button Clicked", values);
      alert("Text fields data saved to database!");
      // Add API logic for saving text field data
      resetForm(); // Reset the form after submission
    }
  };

  return (
    <Box>
      <Paper elevation={19} style={paperStyle}>
        <Box align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{ color: "white", ...mystyle }}>
            Student Details
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmission}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="fullname"
                label="Full Name"
                placeholder="Enter your full name"
                fullWidth
                sx={textFieldSx}
              />
              <ErrorMessage
                name="fullname"
                component="div"
                style={{ color: "red" }}
              />
              <Field
                as={TextField}
                name="rollno"
                label="Roll Number"
                placeholder="Enter your roll number"
                fullWidth
                sx={textFieldSx}
              />
              <ErrorMessage
                name="rollno"
                component="div"
                style={{ color: "red", fontSize: "0.8em" }}
              />
              <Button
                type="submit"
                name="takeImage"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{ marginTop: "15px" }}
                onClick={() => setButtonClicked("takeImage")} // Identify which button was clicked
              >
                TAKE FACE IMAGE
              </Button>
              <Button
                type="submit"
                name="saveData"
                variant="contained"
                color="success"
                fullWidth
                disabled={isSubmitting}
                sx={{ marginTop: "15px" }}
                onClick={() => setButtonClicked("saveData")} // Identify which button was clicked
              >
                SUBMIT STUDENT DATA
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
