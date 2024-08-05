import { Router, Request, Response } from "express";
import { addGuest, editGuest } from "../controllers/guestController"; // Adjust the path as needed

const router = Router();

router.post("/guests", addGuest);
router.post("/guests/edit", (req: Request, res: Response) =>
  editGuest(req, res)
);

export default router;
