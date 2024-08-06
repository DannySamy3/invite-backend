import { Router, Request, Response } from "express";
import {
  addGuest,
  editGuest,
  retriveGuest,
} from "../controllers/guestController"; // Adjust the path as needed

const router = Router();

router.post("/guests", addGuest);
router.get("/retrieve/guest", (req: Request, res: Response) =>
  retriveGuest(req, res)
);
router.post("/guests/edit", (req: Request, res: Response) =>
  editGuest(req, res)
);

export default router;
