import { Router, Request, Response } from "express";
import { addCardData, getCardAndUserData } from "../controllers/cardController";
import createQRCode from "../controllers/cardController";

const router = Router();
//Post Card Data
router.post("/cards", (req, res) => addCardData(req, res));
router.get("/qr", createQRCode);
router.get("/cards/user/:userId", (req, res) => getCardAndUserData(req, res));

export default router;
