import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}
export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access Denied");

  const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET ?? "testsecret") as IPayload;
  console.log(payload);
  req.userId = payload._id

  next();
};
