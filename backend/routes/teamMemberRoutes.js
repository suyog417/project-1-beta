import express from "express";
import TeamMember from "../models/TeamMember.js";

const router = express.Router();

// Get all team members
router.get("/", async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single team member by ID
router.get("/:id", getTeamMember, (req, res) => {
  res.json(res.teamMember);
});

// Create a new team member
router.post("/", async (req, res) => {
  const teamMember = new TeamMember({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    displayOnWebsite: req.body.displayOnWebsite,
    dashBoardAccess: req.body.dashBoardAccess,
    dashboardPassword: req.body.dashboardPassword,
  });

  try {
    const newTeamMember = await teamMember.save();
    res.status(201).json(newTeamMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a team member
router.patch("/:id", getTeamMember, async (req, res) => {
  if (req.body.name != null) {
    res.teamMember.name = req.body.name;
  }
  if (req.body.email != null) {
    res.teamMember.email = req.body.email;
  }
  if (req.body.role != null) {
    res.teamMember.role = req.body.role;
  }
  if (req.body.displayOnWebsite != null) {
    res.teamMember.displayOnWebsite = req.body.displayOnWebsite;
  }
  if (req.body.dashBoardAccess != null) {
    res.teamMember.dashBoardAccess = req.body.dashBoardAccess;
  }
  if (req.body.dashboardPassword != null) {
    res.teamMember.dashboardPassword = req.body.dashboardPassword;
  }

  try {
    const updatedTeamMember = await res.teamMember.save();
    res.json(updatedTeamMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a team member
router.delete("/:id", getTeamMember, async (req, res) => {
  try {
    await res.teamMember.deleteOne();
    res.json({ message: "Deleted Team Member" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single team member by ID
async function getTeamMember(req, res, next) {
  let teamMember;
  try {
    teamMember = await TeamMember.findById(req.params.id);
    if (teamMember == null) {
      return res.status(404).json({ message: "Cannot find team member" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.teamMember = teamMember;
  next();
}

export default router;
