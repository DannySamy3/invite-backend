import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import users from "./routes/users"; 
import cards from "./routes/cards";
import prices from "./routes/prices";
import guests from "./routes/guests";

const app = express();
const port = 3000;


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/logout", (req, res) => {

  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});


app.use("/", users);
app.use("/", cards);
app.use("/", guests);
app.use("/", prices);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
