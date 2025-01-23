const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models/db");
const routes = require("./routes/routes");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
