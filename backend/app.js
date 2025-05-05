import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with correct origin

app.use(
  cors({
    origin: "https://js-seeker.onrender.com", // Directly using the client URL
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Resolve directory name
const __dirname = path.resolve();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable file uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Database Connection
try {
  dbConnection();
} catch (error) {
  console.error("Database connection failed:", error);
}

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Catch-all route for SPA support
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Error Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
