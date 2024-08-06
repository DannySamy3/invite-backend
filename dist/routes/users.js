"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateJWT_1 = __importDefault(require("../middleware/authenticateJWT"));
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Register User
router.post("/users", userController_1.registerUser);
// Check User for Login
router.post("/login", userController_1.checkUser);
router.post("/logout", (req, res) => userController_1.logout);
// Get User Data
router.get("/users/data", authenticateJWT_1.default, userController_1.getUserData);
// router.post("/guests", addGuest);
exports.default = router;
