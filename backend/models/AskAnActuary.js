import mongoose from "mongoose";

const AskAnActuarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const AskAnActuary = mongoose.model("AskAnActuary", AskAnActuarySchema);

export default AskAnActuary;
