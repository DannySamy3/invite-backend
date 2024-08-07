"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guestController_1 = require("../controllers/guestController");
const router = (0, express_1.Router)();
router.post("/guests", guestController_1.addGuest);
router.get("/retrieve/guest", (req, res) => (0, guestController_1.retriveGuest)(req, res));
router.post("/guests/edit", (req, res) => (0, guestController_1.editGuest)(req, res));
exports.default = router;
