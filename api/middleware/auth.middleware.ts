import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

export const Authentication = (roleBase: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid authorization header" });
    }

    const token = authHeader.substring(7);
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const jwtKey = process.env.JWT_SECRET_KEY;

    if (!jwtKey) {
      return res.status(500).json({
        message: "JWT KEY is missing",
      });
    }

    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid token",
        });
      }

      (req as any).user = decoded;

      if ((req as any).user.role !== roleBase) {
        return res.status(403).json({
          message: "Access denied: Insufficient role",
        });
      }

      next();
    });
  };
};