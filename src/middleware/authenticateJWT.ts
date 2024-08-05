import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  //   console.log("Cookies:", req.cookies);
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT secret is not defined" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err: VerifyErrors | null, user: any) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.user = user; // Attach user info to request
      next();
    }
  );
};

export default authenticateJWT;
