import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profession: { type: String },
  company: { type: String },
  phone: { type: String },
  message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
