import { Box, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function SignInOutContainer() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel({ children, value, index, ...other }) {
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </Box>
    );
  }

  return (
    <Box
      style={{
        height: "100vh",

        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        overflow: "hidden",
        position: "relative", // Ensure correct layering
        background: "linear-gradient(90deg,rgb(74, 8, 118), #49a09d)",
        backgroundSize: "200% 200%", // Reduce size for better visibility
        animation: "gradientAnimation 9s ease infinite", // Slow down the animation
        zIndex: 0, // Background layer
      }}
    >
      <Paper
        style={{
          padding: "20px",
          maxWidth: 400,
          zIndex: 1, // Ensure the Paper is above the background
          boxShadow: "0 9px 9px rgb(0, 0, 0)",
          backgroundColor: "transparent",
          borderRadius: 50,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Sign-in/out tabs"
          centered
        >
          <Tab label="SIGNIN" sx={{ fontWeight: "bold" }} />
          <Tab label="SIGNUP" sx={{ fontWeight: "bold" }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Signup />
        </TabPanel>
      </Paper>
      <style>
        {`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </Box>
  );
}
