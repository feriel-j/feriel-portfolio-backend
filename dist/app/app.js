"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const contactRoutes_1 = __importDefault(require("./entities/contact/contactRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: ["KWK"],
    maxAge: 24 * 60 * 60 * 100,
}));
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false
}));
app.get('/', (_req, res) => {
    res.send('🚀 Hello from TypeScript + Express!');
});
app.use("/api", contactRoutes_1.default);
app.listen(process.env.APP_PORT || 5000, () => {
    console.log("server is running on " + process.env.APP_PORT || 5000);
});
//# sourceMappingURL=app.js.map