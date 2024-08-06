// src/app.ts
import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import users from "./routes/users"; // Import routes
import cards from "./routes/cards";
import prices from "./routes/prices";
import guests from "./routes/guests";

const app = express();
const port = 3000;

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.options("*", cors());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", users);
app.use("/", cards);
app.use("/", guests);
app.use("/", prices); // Use the same base path as other routes

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
