import { Request, Response } from "express";
import client from "../dt";

export const addGuest = async (req: Request, res: Response) => {
  const { first_name, last_name, plan, mobile_number, status, inviter_id } =
    req.body;

  try {
    const result = await client.query(
      `INSERT INTO guest (first_name, last_name, plan, mobile_number, status, inviter_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, plan, mobile_number, status, inviter_id]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editGuest = async (req: Request, res: Response) => {
  const { guest_id, status } = req.body;

  // Ensure guest_id is provided
  if (!guest_id) {
    return res.status(400).json({ error: "Guest ID is required" });
  }

  try {
    const result = await client.query(
      `UPDATE guest 
       SET status = $1
       WHERE guest_id = $2
       RETURNING *`,
      [status, guest_id]
    );

    // Check if the row was updated
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Guest not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export async function retriveGuest(req: Request, res: Response) {
  const { id } = req.query;

  try {
    // Fetch the guest from the database
    const result = await client.query(
      "SELECT first_name, last_name, status FROM guest WHERE guest_id = $1",
      [id]
    );

    if (result.rows.length > 0) {
      const guest = result.rows[0];
      res.status(200).json(guest);
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (error) {
    console.error("Error fetching guest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
