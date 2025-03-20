import express from "express";
import Contact from "../models/Contact.js";
import AskAnActuary from "../models/AskAnActuary.js";
import Blog from "../models/Blog.js";
import Enrollment from "../models/Enrollments.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contactCount = await Contact.countDocuments();
    const askAnActuaryCount = await AskAnActuary.countDocuments();
    const blogCount = await Blog.countDocuments();
    const enrollmentCount = await Enrollment.countDocuments();

    res.status(200).json({
      contactCount,
      askAnActuaryCount,
      blogCount,
      enrollmentCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res
      .status(500)
      .json({ message: "Error fetching dashboard stats", error: error.message });
  }
});

export default router;
