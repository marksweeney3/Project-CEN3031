const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import route files
const testRoutes = require("./routes/api_calls");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Use routes
app.use("/", testRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
