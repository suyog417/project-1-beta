import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Route to submit a contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, profession, company, phone, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      profession,
      company,
      phone,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res
      .status(500)
      .json({ message: "Error submitting contact form", error: error.message });
  }
});

// Route to fetch all contact form submissions (for admin panel)
router.get("/all", async (req, res) => {
  try {
    const allContacts = await Contact.find();
    res.status(200).json(allContacts);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({ message: "Error fetching contact submissions", error: error.message });
  }
});

// Route to delete a contact form submission (for admin panel)
router.delete("/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact form submission not found" });
    }

    res.status(200).json({ message: "Contact form submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    res.status(500).json({ message: "Error deleting contact submission", error: error.message });
  }
});

export default router;
