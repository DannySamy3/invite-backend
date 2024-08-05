import { Router } from "express";
import { addPricePlan } from "../controllers/priceController";

const router = Router();

router.post("/prices", (req, res) => addPricePlan(req, res));

export default router;
