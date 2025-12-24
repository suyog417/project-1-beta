import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: "About Us" },
    description: { type: String },
    image: { type: String },
  },
  leadership: {
    name: { type: String, default: "Anuradha Lal" },
    title: { type: String, default: "Founder" },
    designation: { type: String, default: "FIA, FIAI" },
    description: { type: String },
    image: { type: String },
  },
  mission: {
    title: { type: String, default: "Our Mission" },
    description: { type: String },
  },
  values: [
    {
      title: String,
      description: String,
      image: String,
    }
  ],
  roadAhead: {
    title: { type: String, default: "The Road Ahead" },
    description: { type: String },
  },
  team: [
    {
      name: String,
      title: String,
      image: String,
    }
  ]
}, { timestamps: true });

export default mongoose.model("About", AboutSchema);
