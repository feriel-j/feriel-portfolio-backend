// contactService.ts
import nodemailer from "nodemailer";

export const sendContactEmails = async (
  name: string,
  email: string,
  message: string
): Promise<void> => {
  const senderEmail = process.env.EMAIL_USER;
  const senderPassword = process.env.EMAIL_PASS;

  if (!senderEmail || !senderPassword) {
    throw new Error("Email credentials are missing in environment variables.");
  }

  const transporter = nodemailer.createTransport({
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
  } catch (error) {
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
  } catch (error) {
    console.error("❌ Failed to send confirmation email to user:", error);
    // ❌ Don't throw — it's not critical
    // If you prefer, log it but still succeed overall
  }
};
