import { Request, Response } from "express";
import client from "../dt";

export const addPricePlan = async (req: Request, res: Response) => {
  const { family, single, double, id_foreign } = req.body;

  

  try {
    const result = await client.query(
      "INSERT INTO prices (family, single, double, id_foreign) VALUES ($1, $2, $3, $4) RETURNING *",
      [family, single, double, id_foreign]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "An error occurred while inserting data" });
  }
};
