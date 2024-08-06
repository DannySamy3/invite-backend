"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users")); // Import routes
const cards_1 = __importDefault(require("./routes/cards"));
const prices_1 = __importDefault(require("./routes/prices"));
const guests_1 = __importDefault(require("./routes/guests"));
const app = (0, express_1.default)();
const port = 3000;
// CORS setup
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
// Other middleware
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Logout endpoint
app.post("/logout", (req, res) => {
    // Clear the JWT token cookie
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});
// Mounting routes
app.use("/", users_1.default);
app.use("/", cards_1.default);
app.use("/", guests_1.default);
app.use("/", prices_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});
exports.default = app;
