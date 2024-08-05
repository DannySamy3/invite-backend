"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
// import createQRCode from "../controllers/cardController";
const router = (0, express_1.Router)();
//Post Card Data
router.post("/cards", (req, res) => (0, cardController_1.addCardData)(req, res));
// add QR code
// router.post("/cards/qr", (req: Request, res: Response) =>
//   createQRCode(req, res)
// );
exports.default = express_1.Router;
