import bcrypt from "bcrypt";

import { Request, Response } from "express";
import client from "../dt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { setCookie } from "nookies";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // Import JWT_SECRET from environment variables

export const registerUser = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    country,
    password,
    gender,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone_number ||
    !country ||
    !password ||
    !gender
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      "INSERT INTO users (first_name, last_name, email, phone_number, country, password, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        first_name,
        last_name,
        email,
        phone_number,
        country,
        hashedPassword,
        gender,
      ]
    );
    return res.status(201);
  } catch (error) {
    console.error("Database insertion error:", error); // Log the error details
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export async function getUserByEmail(email: string) {
  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return result.rows[0];
  } catch (err) {
    console.error(err);
  }
}

export async function validateUserPassword(
  user: { password: string },
  password: string
) {
  return bcrypt.compare(password, user.password);
}

export const checkUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET is not defined" });
  }

  try {
    const user = await getUserByEmail(email);
    if (user && (await validateUserPassword(user, password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      //   activeUser=user
      setCookie({ res }, "token", token, { path: "/", httpOnly: true });

      return res.status(200).json({ token });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
};

export const getUserData = async (req: Request, res: Response) => {
  if (!req.user || !req.user.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await getUserByEmail(req.user.email);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




