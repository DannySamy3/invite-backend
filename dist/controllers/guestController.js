"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editGuest = exports.addGuest = void 0;
const dt_1 = __importDefault(require("../dt"));
const addGuest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, plan, mobile_number, status, inviter_id } = req.body;
    try {
        const result = yield dt_1.default.query(`INSERT INTO guest (first_name, last_name, plan, mobile_number, status, inviter_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [first_name, last_name, plan, mobile_number, status, inviter_id]);
        return res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addGuest = addGuest;
const editGuest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guest_id, status } = req.body;
    // Ensure guest_id is provided
    if (!guest_id) {
        return res.status(400).json({ error: "Guest ID is required" });
    }
    try {
        const result = yield dt_1.default.query(`UPDATE guest 
       SET status = $1
       WHERE guest_id = $2
       RETURNING *`, [status, guest_id]);
        // Check if the row was updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Guest not found" });
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.editGuest = editGuest;
