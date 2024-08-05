"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
const cardController_2 = __importDefault(require("../controllers/cardController"));
const router = (0, express_1.Router)();
//Post Card Data
router.post("/cards", (req, res) => (0, cardController_1.addCardData)(req, res));
router.get("/qr", cardController_2.default);
router.get("/cards/user/:userId", (req, res) => (0, cardController_1.getCardAndUserData)(req, res));
exports.default = router;
