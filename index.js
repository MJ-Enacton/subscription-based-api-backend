import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import usageRoutes from "./routes/usage.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 3,
//   message: "Too many request from this IP",
// });

// app.use(limiter);

app.use("/auth/", authRoutes);
app.use("/api/", usageRoutes);

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
