import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  displayOnWebsite: {
    type: Boolean,
    default: false,
  },
  dashBoardAccess: {
    type: Boolean,
    default: false,
  },
  dashboardPassword: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
