"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contactServices_1 = require("./contactServices");
const handleContactForm = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        await (0, contactServices_1.sendContactEmails)(name, email, message);
        return res.status(200).json({ success: true, message: "Your Message is sent successfully" });
    }
    catch (error) {
        console.error("❌ Email send error:", error);
        return res.status(500).json({ error: "Failed to send message. Please try again !" });
    }
};
exports.default = handleContactForm;
