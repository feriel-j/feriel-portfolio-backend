"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmails = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendContactEmails = (name, email, message) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        const adminInfo = yield transporter.sendMail({
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
    try {
        const userInfo = yield transporter.sendMail({
            from: `"Feriel" <${senderEmail}>`,
            to: email,
            subject: "✅ We received your message!",
            text: `Hi ${name},\n\nThank you for contacting me! I'll get back to you soon.\n\n— Feriel`,
        });
        console.log("✅ User email sent:", userInfo.messageId);
    }
    catch (error) {
        console.error("❌ Failed to send confirmation email to user:", error);
    }
});
exports.sendContactEmails = sendContactEmails;
//# sourceMappingURL=contactServices.js.map