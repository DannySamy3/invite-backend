"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guestController_1 = require("../controllers/guestController"); // Adjust the path as needed
const router = (0, express_1.Router)();
router.post("/guests", guestController_1.addGuest);
exports.default = router;