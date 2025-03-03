import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js"; // Ensure file extension is included
import blogRoutes from "./routes/blogRoutes.js"; // Ensure file extension is included
import contactRoutes from "./routes/contactRoutes.js"; // Ensure file extension is included
import askAnActuaryRoutes from "./routes/askAnActuaryRoutes.js";
import sendEmailRoutes from "./routes/sendEmailRoutes.js";
// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// ✅ Improved CORS - Allow only specific origins (replace with your frontend URL)
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Adjust for your frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.get("/", (req, res) => res.send("Express on Vercel"));

// ✅ Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/askAnActuary", askAnActuaryRoutes);
app.use("/api/sendEmail", sendEmailRoutes);


// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// ✅ Handle Uncaught Exceptions & Rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
