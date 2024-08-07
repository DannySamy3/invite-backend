import { Router } from "express";

import authenticateJWT from "../middleware/authenticateJWT";
import {
  registerUser,
  checkUser,
  getUserData,
  logout,
  getUserId,
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

router.get("/userById/:id", (req, res) => getUserId(req, res));
export default router;
