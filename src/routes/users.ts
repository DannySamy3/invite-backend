import { Router } from "express";

import authenticateJWT from "../middleware/authenticateJWT";
import {
  registerUser,
  checkUser,
  getUserData,
  logout,
} from "../controllers/userController";

const router = Router();

// Register User
router.post("/users", registerUser);

// Check User for Login
router.post("/login", checkUser);
router.post("/logout", (req, res) => logout);

// Get User Data
router.get("/users/data", authenticateJWT, getUserData);
// router.post("/guests", addGuest);

export default router;
