"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmails = void 0;
// contactService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendContactEmails = async (name, email, message) => {
    const senderEmail = process.env.EMAIL_USER;
    const senderPassword = process.env.EMAIL_PASS;
    if (!senderEmail || !senderPassword) {
        throw new Error("Email credentials are missing in environment variables.");
    }
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: senderEmail,
            pass: senderPassword,
        },
    });
    // Send email to admin (you)
    try {
        const adminInfo = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: senderEmail,
            subject: "📬 New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        });
        console.log("📨 Admin email sent:", adminInfo.messageId);
    }
    catch (error) {
        console.error("❌ Failed to send email to admin:", error);
        throw new Error("Failed to send admin email.");
    }
    // Send confirmation to user
    try {
        const userInfo = await transporter.sendMail({
            from: `"Feriel" <${senderEmail}>`,
            to: email,
            subject: "✅ We received your message!",
            text: `Hi ${name},\n\nThank you for contacting me! I'll get back to you soon.\n\n— Feriel`,
        });
        console.log("✅ User email sent:", userInfo.messageId);
    }
    catch (error) {
        console.error("❌ Failed to send confirmation email to user:", error);
        // ❌ Don't throw — it's not critical
        // If you prefer, log it but still succeed overall
    }
};
exports.sendContactEmails = sendContactEmails;
