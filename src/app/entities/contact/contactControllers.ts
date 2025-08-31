// contactControllers.ts
import { Request, Response } from "express";
import { sendContactEmails } from "./contactServices";

const handleContactForm = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await sendContactEmails(name, email, message);
    return res.status(200).json({ success: true, message: "Your Message is sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again !" });
  }
};

export default handleContactForm;
