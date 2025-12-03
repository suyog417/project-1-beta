import mongoose from "mongoose";
import slugify from "slugify";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  publishDate: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
  image: { type: String },
});

BlogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Fix: Check if model exists before creating to prevent overwrite errors
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;