"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: "postgres",
    host: "localhost",
    database: "wed",
    password: "zinc",
    port: 5432,
});
client
    .connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Connection error", err.stack));
exports.default = client;
