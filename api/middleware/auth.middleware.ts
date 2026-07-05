import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

export const Authentication = (roleBase: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

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

    jwt.verify(token, jwtKey, (err: any, decoded: any) => {
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
// export const Authentication = (roleBase: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.header("Authorization");
//     // const authHeader = req.cookies.token;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Invalid authorization header" });
//     }

//     const token = authHeader.substring(7);
//     console.log(token);
//     if (!token) {
//       return res.status(401).json({
//         message: "Token not found",
//       });
//     }

//     const jwtKey = process.env.JWT_SECRET_KEY;

//     if (!jwtKey) {
//       return res.status(500).json({
//         message: "JWT KEY is missing",
//       });
//     }

//     jwt.verify(token, jwtKey, (err : any, decoded : any) => {
//       if (err) {
//         return res.status(403).json({
//           message: "Invalid token",
//         });
//       }

//       (req as any).user = decoded;

//       if ((req as any).user.role !== roleBase) {
//         return res.status(403).json({
//           message: "Access denied: Insufficient role",
//         });
//       }

//       next();
//     });
//   };
// };


// frontend user without token ;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const jwtKey = process.env.JWT_SECRET_KEY;

    if (!jwtKey) {
      return res.status(500).json({
        message: "JWT KEY is missing",
      });
    }

    jwt.verify(token, jwtKey, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid token",
        });
      }

      (req as any).user = decoded;
    });

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};