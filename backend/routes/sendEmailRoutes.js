import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, message, profession } = req.body;

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY in environment variables.");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    if (!name || !email || !phone || !company || !message || !profession) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Construct the email body (you might want to use a template here)
    const emailBody = `
      <h1>Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Profession:</strong> ${profession}</p>
    `;

    const data = await resend.emails.send({
      from: 'Get2Act <noreply@gettoact.onmicrosoft.com>',
      to: [email], // Send to the user
      subject: 'Contact Form Submission Confirmation',
      html: emailBody, // Use the constructed email body
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return res.status(500).json({ error: data.error });
    }

    console.log("Confirmation email sent successfully!");
    res.status(200).json({ message: "Confirmation email sent successfully!" });

  } catch (error) {
    console.error("Error sending confirmation email:", error);
    res.status(500).json({ error: "Failed to send confirmation email" });
  }
});

export default router;
