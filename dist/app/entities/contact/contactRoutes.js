"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// contactRoutes.ts
const express_1 = require("express");
const contactControllers_1 = __importDefault(require("./contactControllers"));
const contactRouter = (0, express_1.Router)();
contactRouter.post('/contact', (req, res) => {
    (0, contactControllers_1.default)(req, res);
});
exports.default = contactRouter;
