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
Object.defineProperty(exports, "__esModule", { value: true });
const contactServices_1 = require("./contactServices");
const handleContactForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        yield (0, contactServices_1.sendContactEmails)(name, email, message);
        return res.status(200).json({ success: true, message: "Your Message is sent successfully" });
    }
    catch (error) {
        console.error("❌ Email send error:", error);
        return res.status(500).json({ error: "Failed to send message. Please try again !" });
    }
});
exports.default = handleContactForm;
//# sourceMappingURL=contactControllers.js.map