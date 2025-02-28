import Blog from "../models/Blog.js";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, content, status, publishDate } = req.body;

    const newBlog = new Blog({
      title,
      description,
      content,
      status: status || "draft",
      publishDate: publishDate || Date.now(),
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};

// Update a blog by ID
export const updateBlog = async (req, res) => {
  try {
    const { title, description, content, status, publishDate } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        content,
        status,
        publishDate,
        image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
};

// Add multer middleware to routes
export const uploadMiddleware = upload.single("image");