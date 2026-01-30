const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./controllers/authController");  // ✅ correct path

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Route mounting
app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
