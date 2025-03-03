import mongoose from "mongoose";

const enrollmentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  DOB: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  coursetype: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Enrollments = mongoose.model("Enrollments", enrollmentsSchema);

export default Enrollments;
