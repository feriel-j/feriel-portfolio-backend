"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const body_parser_1 = __importDefault(require("body-parser"));
import cors from "cors"; 
const contactRoutes_1 = __importDefault(require("./entities/contact/contactRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
//------------- google auth config --------------------
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: ["KWK"],
    maxAge: 24 * 60 * 60 * 100,
}));

// --- FINAL CORS CONFIG ---
app.use(cors({
  origin: [
    "https://feriel.netlify.app", // production
    "http://localhost:3000"       // development
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// const allowedOrigins = [
//   "http://localhost:3000",        // dev
//   "https://feriel.netlify.app"    // production
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     // autorise les requêtes sans origin (ex : Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ["GET","POST","PUT","DELETE"],
//   credentials: true
// }));
// app.use((0, cors_1.default)({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
// }));
// Simple route
app.get('/', (_req, res) => {
    res.send('🚀 Hello from TypeScript + Express!');
});
//------------- Contact --------------------
app.use("/api", contactRoutes_1.default);
app.listen(process.env.APP_PORT || 5000, () => {
    console.log("server is running on " + process.env.APP_PORT || 5000);
});
