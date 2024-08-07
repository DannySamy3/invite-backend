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
exports.addPricePlan = void 0;
const dt_1 = __importDefault(require("../dt"));
const addPricePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { family, single, double, id_foreign } = req.body;
    try {
        const result = yield dt_1.default.query("INSERT INTO prices (family, single, double, id_foreign) VALUES ($1, $2, $3, $4) RETURNING *", [family, single, double, id_foreign]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ error: "An error occurred while inserting data" });
    }
});
exports.addPricePlan = addPricePlan;
