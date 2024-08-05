import { Request, Response } from "express";
import client from "../dt";
import { generateQRCode } from "../utils/generateQRCode";

export const addCardData = async (req: Request, res: Response) => {
  const {
    header_text,
    salutation,
    bride,
    groom,
    venue,
    date,
    remark,
    description,
    pdf,
    user_id,
    contacts,
  } = req.body;

  try {
    const result = await client.query(
      `INSERT INTO card (header_text, salutation, bride, groom, venue, date, remark, description, pdf, user_id,contacts)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *`,
      [
        header_text,
        salutation,
        bride,
        groom,
        venue,
        date,
        remark,
        description,
        pdf ? Buffer.from(pdf, "base64") : null, // Convert base64 to binary
        user_id,
        contacts,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default async function createQRCode(req: Request, res: Response) {
  try {
    const { data } = req.query;

    if (!data || typeof data !== "string") {
      return res
        .status(400)
        .json({ error: "Data is required and must be a string" });
    }

    // Decode and parse the data query parameter
    const parsedData = JSON.parse(decodeURIComponent(data));

    // Generate QR code
    const qrCodeDataUrl = await generateQRCode(parsedData);

    // Send the QR code image as a response
    res.status(200).json({ qrCode: qrCodeDataUrl });
  } catch (err) {
    console.error("Error handling QR code request:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getCardAndUserData = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Query to get card and guest data with full outer join
    const result = await client.query(
      `SELECT 
        card.id AS card_id,
        card.header_text, 
        card.salutation, 
        card.bride, 
        card.groom, 
        card.venue, 
        card.date, 
        card.remark, 
        card.description,
        card.user_id,
        card.pdf,
        card.contacts,
        guest.guest_id,
        guest.first_name,
        guest.last_name,
        guest.plan,
        guest.inviter_id,
        guest.status,
        guest.mobile_number
      FROM card
      FULL OUTER JOIN guest ON card.user_id = guest.inviter_id
      WHERE card.user_id = $1 OR guest.inviter_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No data found for this user" });
    }

    // const lastRow = result.rows[result.rows.length - 1];
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
