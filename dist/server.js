"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = __importDefault(require("./app"));
const port = 3000; // Or use process.env.PORT if you decide to use environment variables
app_1.default.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
