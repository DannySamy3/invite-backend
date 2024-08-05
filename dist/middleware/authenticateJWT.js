"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    //   console.log("Cookies:", req.cookies);
    const token = req.cookies.token; // Get the token from cookies
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: "JWT secret is not defined" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden" });
        }
        req.user = user; // Attach user info to request
        next();
    });
};
exports.default = authenticateJWT;
