import Contact from "../models/Contact.js";

// Submit a contact form
export const submitContactForm = async (req, res) => {
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
};

// Fetch all contact form submissions (for admin panel)
export const getAllContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find();
    res.status(200).json(allContacts);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({ message: "Error fetching contact submissions", error: error.message });
  }
};

// Delete a contact form submission (for admin panel)
export const deleteContact = async (req, res) => {
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
};
