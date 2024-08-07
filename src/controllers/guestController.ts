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

export const getGuestPrice = async (req: Request, res: Response) => {
  const guestId = req.query;
  try {
    const query = `
      SELECT
          g.guest_id,
          g.first_name,
          g.last_name,
          g.plan,
          p.family,
          p.single,
          p.double
      FROM
          guest g
      JOIN
          prices p ON g.plan = CASE
                                WHEN g.plan = 'family' THEN p.family
                                WHEN g.plan = 'single' THEN p.single
                                WHEN g.plan = 'double' THEN p.double
                              END
      WHERE
          g.guest_id = $1;
    `;

    const { rows } = await client.query(query, [guestId]);

    if (rows.length > 0) {
      return rows[0]; // Return the first row (assuming guest_id is unique)
    } else {
      return null; // Handle case where guest with given ID is not found
    }
  } catch (error) {
    console.error("Error fetching guest price:", error);
    throw error; // Propagate the error
  }
};
