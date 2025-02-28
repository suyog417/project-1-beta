import express from "express";
import AskAnActuary from "../models/AskAnActuary.js";

const askAnActuaryRoutes = express.Router();

// Route to submit a query
askAnActuaryRoutes.post("/submit", async (req, res) => {
  try {
    const { name, email, profession, company, phone, message } = req.body;

    const newQuery = new AskAnActuary({
      name,
      email,
      profession,
      company,
      phone,
      message,
    });

    const savedQuery = await newQuery.save();
    res.status(201).json({ message: "Query submitted successfully", query: savedQuery });
  } catch (error) {
    console.error("Error submitting query:", error);
    res.status(500).json({ message: "Error submitting query", error: error.message });
  }
});

// Route to fetch all queries (for admin panel)
askAnActuaryRoutes.get("/all", async (req, res) => {
  try {
    const allQueries = await AskAnActuary.find();
    res.status(200).json(allQueries);
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ message: "Error fetching queries", error: error.message });
  }
});

// Route to delete a query (for admin panel)
askAnActuaryRoutes.delete("/:id", async (req, res) => {
    try {
      const queryId = req.params.id;
      const deletedQuery = await AskAnActuary.findByIdAndDelete(queryId);
  
      if (!deletedQuery) {
        return res.status(404).json({ message: "Query not found" });
      }
  
      res.status(200).json({ message: "Query deleted successfully" });
    } catch (error) {
      console.error("Error deleting query:", error);
      res.status(500).json({ message: "Error deleting query", error: error.message });
    }
  });

export default askAnActuaryRoutes;
