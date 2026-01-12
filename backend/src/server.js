import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MUST be BEFORE routes
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "AuthHub backend running 🚀" });
});

// DB
connectDB();

// server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
